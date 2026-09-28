from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = []


@app.route("/")
def home():
    return jsonify({
        "message": "MyBank backend is running successfully!"
    })


@app.route("/api/test")
def test():
    return jsonify({
        "status": "success",
        "message": "MyBank API is working!"
    })


@app.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({
            "status": "error",
            "message": "Username and password are required"
        }), 400

    for user in users:
        if user["username"] == username:
            return jsonify({
                "status": "error",
                "message": "Username already registered"
            }), 400

    new_user = {
        "username": username,
        "password": password
    }

    users.append(new_user)

    return jsonify({
        "status": "success",
        "message": "Registration successful"
    }), 201


@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({
            "status": "error",
            "message": "Username and password are required"
        }), 400

    for user in users:
        if user["username"] == username and user["password"] == password:
            return jsonify({
                "status": "success",
                "message": "Login successful"
            }), 200

    return jsonify({
        "status": "error",
        "message": "Invalid username or password"
    }), 401


if __name__ == "__main__":
    app.run(debug=True)