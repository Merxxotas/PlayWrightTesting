from flask import Flask, request, jsonify

app = Flask(__name__)

# Dataset de ejemplo para pruebas.

resources = {
    1: {"name": "Resource 1", "type": "Type A"},
    2: {"name": "Resource 2", "type": "Type B"},
    3: {"name": "Resource 3", "type": "Type C"}
}

#Obtener la data
@app.route('/resources', methods=['GET'])
def get_resources():
    data = request.json
    # Procesar los datos recibidos
    return jsonify({"message": "Datos recibidos", "data": resources}), 200

if __name__ == '__main__':
    app.run(debug=True)
