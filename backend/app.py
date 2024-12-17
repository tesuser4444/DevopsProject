from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

# Configuración inicial
app = Flask(__name__)
CORS(app)

# Configurar base de datos (usa .env para credenciales sensibles)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@db/registration_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = './uploads'

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    profile_image = db.Column(db.String(200), nullable=False)

# Crear las tablas
with app.app_context():
    db.create_all()


# Ruta para registro
@app.route('/register', methods=['POST'])
def register():
    try:
        # Extraer datos del formulario
        data = request.form
        file = request.files['profile_image']

        # Guardar imagen
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Crear registro del usuario
        new_user = User(
            full_name=data['full_name'],
            email=data['email'],
            phone=data['phone'],
            profile_image=filename
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Registro exitoso'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=8081, debug=True, host="0.0.0.0")
