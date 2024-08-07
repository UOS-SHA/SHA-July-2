from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, decode_token, get_jwt_identity
from datetime import timedelta
import mysql.connector


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'my_secret_key' # 안전하게 관리해야 함
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1) # 토큰 만료 시간 설정
jwt = JWTManager(app)
CORS(app, supports_credentials = True)

db = mysql.connector.connect(
    host="database-login.c98wygeiir6f.ap-northeast-2.rds.amazonaws.com",
    user="admin",
    password="kimmin0411!",
    database="database_login"
)


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # 비밀번호 해싱 (주석 해제)
    # hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    cursor = db.cursor()

    # Check out user already registered.
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user:
        cursor.close()
        return jsonify({"message": "User already exists"}), 409

    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    db.commit()
    cursor.close()

    return jsonify({"message": "User registered successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    cursor.close()

    if user:   
        access_token = create_access_token(identity=username)
        # 토큰을 db에 저장
        cursor = db.cursor()
        cursor.execute("UPDATE users SET token = %s WHERE username = %s", (access_token, username))
        db.commit()
        cursor.close()
        return jsonify(message = "Login successful", token=access_token), 200            
        
    else:
        return jsonify({"message": "Invalid username or password"}), 401

@app.route('/mypage', methods = ['GET'])
@jwt_required()
def mypage():
    username = get_jwt_identity()

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT point, username FROM users WHERE username = %s", (username,))
    userInfo = cursor.fetchone()
    cursor.close()
    if userInfo:
        return jsonify(userInfo),200
    else:
        return jsonify({'message' : "User Not Found"}), 404



@app.route('/bet', methods = ['POST'])
@jwt_required()
def bet():
    data = request.json
    user = get_jwt_identity()
    bet_amount = data.get('bet_amount')
    result = data.get('result')
    selected_side = data.get('selected_side')
    print(data)
    print(bet_amount,result,selected_side)

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s", (user,))
    users = cursor.fetchone()
    print(users)
    if not users:
        return jsonify({"message" : "User not found"}),404
    if result==selected_side:
        users['point'] += bet_amount 
    else:
        users['point'] -= bet_amount
    print(users['point'])
    cursor.execute("UPDATE users SET point = %s  WHERE username = %s",(users['point'], user))
    db.commit()
    cursor.close()

    return jsonify(users)

@app.route('/admin', methods=['GET'])
@jwt_required()
def admin():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    
    current_user = get_jwt_identity()
    cursor.execute("SELECT * FROM users WHERE username = %s",(current_user,))
    currentUserInfo = cursor.fetchone()
    if currentUserInfo['role'] != 'admin':
        return jsonify({'error' : 'Access forbidden'}), 403
    return jsonify(users),200

if __name__ == "__main__":
    app.run(host = '0.0.0.0',debug=True)