from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

# Configuración inicial
app = Flask(__name__)
CORS(app)

# Configurar base de datos (usa .env para credenciales sensibles)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user:password@db/registration_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = './uploads'

db = SQLAlchemy(app)



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
    app.run(port=8080, debug=True)