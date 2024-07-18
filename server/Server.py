from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import bcrypt

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="0411",
    database="login_db"
)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # 비밀번호 해싱
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    cursor = db.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_password))
    db.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user:
        stored_password_hash = user['password']
        
        try:
            # 입력 비밀번호를 해싱된 비밀번호와 비교
            if bcrypt.checkpw(password.encode('utf-8'), stored_password_hash.encode('utf-8')):
                return jsonify({"message": "Login Success"}), 200
            else:
                return jsonify({"message": "Invalid username or password"}), 401
        except ValueError as e:
            # 해싱된 비밀번호가 올바르지 않을 때 발생하는 오류 처리
            return jsonify({"message": f"Error in password hash: {str(e)}"}), 500
    else:
        return jsonify({"message": "Invalid username or password"}), 401

if __name__ == "__main__":
    app.run(host = '0.0.0.0',debug=True)
