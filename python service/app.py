from flask import Flask, request, jsonify
import base64
import io
from PIL import Image
import numpy as np
import face_recognition
from pymongo import MongoClient
from flask_cors import CORS
from datetime import datetime, timezone, timedelta



app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

#time zone (IST)
IST = timezone(timedelta(hours=5, minutes=30))

# MongoDB setup
client = MongoClient("mongodb+srv://dssharma5656213:1Evw3b7Ck4c5wyCC@cluster0.lx5xwxa.mongodb.net/attendanceDB")
db = client["attendanceDB"]
users = db["users"]
attendance = db["attendance"]



def base64_to_image(base64_str):
    image_bytes = base64.b64decode(base64_str.split(",")[-1])  # remove prefix if any
    image = Image.open(io.BytesIO(image_bytes))
    return np.array(image)

# compare and mark attendance api

@app.route("/api/v1/compare", methods=["POST"])
def compare_face():
    data = request.json
    id_card = data.get("idCardNumber")
    live_photo_b64 = data.get("livePhoto")

    if not id_card or not live_photo_b64:
        return jsonify({"success": False, "message": "Missing parameters"}), 400

    # Fetch user from MongoDB
    user = users.find_one({"idCardNumber": id_card})
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    saved_photo_b64 = user.get("photo")
    if not saved_photo_b64:
        return jsonify({"success": False, "message": "No photo saved for this user"}), 400

    # Convert Base64 → Image
    saved_image = base64_to_image(saved_photo_b64)
    live_image = base64_to_image(live_photo_b64)

    # Face encoding
    try:
        saved_encodings = face_recognition.face_encodings(saved_image)
        live_encodings = face_recognition.face_encodings(live_image)

        if len(live_encodings) != 1:
            return jsonify({
                "success": False,
                "message": "Multiple or no faces detected. Ensure only one person in frame."
            }), 400

        saved_encoding = saved_encodings[0]
        live_encoding = live_encodings[0]
    except Exception as e:
        return jsonify({"success": False, "message": f"Encoding error: {str(e)}"}), 400

    # Compare faces using distance (stronger and tunable)
    distance = face_recognition.face_distance([saved_encoding], live_encoding)[0]
    threshold = 0.45  # lower = stricter check
    match = distance < threshold

    if match:
        # ✅ Mark attendance
        attendance_record = {
            "idCardNumber": id_card,
            "firstName": user.get("firstName"),
            "lastName": user.get("lastName"),
            "role":user.get("role"),
            "timestamp": datetime.now(IST),
            "match_confidence": float(1 - distance)
        }
        attendance.insert_one(attendance_record)
        return jsonify({
            "success": True,
            "match": True,
            "message": "✅ Face matched successfully, attendance marked.",
            "confidence": f"{(1 - distance):.2f}"
        })
    else:
        return jsonify({
            "success": True,
            "match": False,
            "message": "❌ Face did not match. Try again.",
            "distance": float(distance)
        })


        
# Get Attendance Data with optional date filter

@app.route("/api/v1/present-user", methods=["GET"])
def get_attendance():
    try:
        date_str = request.args.get("date")  # Optional query param ?date=YYYY-MM-DD
        query = {}

        if date_str:
            selected_date = datetime.strptime(date_str, "%Y-%m-%d")
            start = datetime.combine(selected_date, datetime.min.time())
            end = datetime.combine(selected_date, datetime.max.time())
            query["timestamp"] = {"$gte": start, "$lte": end}

        # Fetch data from MongoDB, sort newest first
        records = list(attendance.find(query, {"_id": 0}).sort("timestamp", -1))

        return jsonify({
            "success": True,
            "count": len(records),
            "data": records
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error fetching attendance: {str(e)}"
        }), 500






if __name__ == "__main__":
    app.run(port=5000, debug=True)
