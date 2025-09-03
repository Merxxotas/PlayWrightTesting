from flask import Flask, request, jsonify, Response

app = Flask(__name__)

# Dataset de ejemplo para pruebas.

resources = {
    1: {"name": "Resource 1", "type": "Type A"},
    2: {"name": "Resource 2", "type": "Type B"},
    3: {"name": "Resource 3", "type": "Type C"}
}

# Obtener la data
# @app.route('/', methods=['GET'])


@app.route('/resources', methods=['GET'])
def get_resources():
    # Procesar los datos recibidos
    return jsonify({"message": "Datos recibidos", "data": resources}), 200


# Obtener un recurso por ID
@app.route('/resources/<int:resource_id>', methods=['GET'])
def get_resource(resource_id):
    resource = resources.get(resource_id)
    if resource:
        return jsonify({"message": "Recurso encontrado", "data": resource}), 200
    else:
        return jsonify({"message": "Recurso no encontrado"}), 404


# Validar un auth route
@app.route('/secure-resource', methods=['GET'])
def get_secure_resource():
    auth_header = request.headers.get('Authorization')
    if auth_header == 'Bearer valid_token':
        return jsonify({"message": "Acceso autorizado", "data": "Este es un recurso seguro"}), 200
    else:
        return jsonify({"message": "Acceso denegado, no autorizado"}), 401


# Visualizar datos mediante XML-Data
@app.route('/xml-resource', methods=['GET'])
def get_xml_response():
    # Aquí se generaría la respuesta en formato XML
    xml_data = "<resources>"
    for resource_id, resource in resources.items():
        xml_data += f"<resource id='{resource_id}'>"
        xml_data += f"<name>{resource['name']}</name>"
        xml_data += f"<type>{resource['type']}</type>"
        xml_data += "</resource>"
    xml_data += "</resources>"
    # Devolvemos una tupla: (body, status, headers)
    return xml_data, 200, {'Content-Type': 'application/xml'}


if __name__ == '__main__':
    app.run(debug=True)
