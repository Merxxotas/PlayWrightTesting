import requests

BASE_URL = 'http://127.0.0.1:5000'

# Test: Obtener todos los recursos


def test_get_resources():
    response = requests.get(f'{BASE_URL}/resources')
    assert response.status_code == 200
    assert isinstance(response.json(), dict)


# Test: Obtener un recurso por ID
def test_get_resource_by_id():
    response = requests.get(f'{BASE_URL}/resources/3')
    assert response.status_code == 200
    assert isinstance(response.json(), dict)
    assert 'name' in response.json().get("data", {})
    assert 'type' in response.json().get("data", {})


# Test: Obtener un recurso no existente
def test_get_resource_not_found():
    response = requests.get(f'{BASE_URL}/resources/999')
    assert response.status_code == 404
    assert isinstance(response.json(), dict)
    assert response.json().get("message") == "Recurso no encontrado"


# Test: Testeando recursos autorizados (auth)
def test_get_secure_resource_authorized():
    headers = {'Authorization': 'Bearer valid_token'}
    response = requests.get(f'{BASE_URL}/secure-resource', headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json(), dict)
    assert response.json().get("message") == "Acceso autorizado"


# Test: Testeando recursos autorizados, pero sin credenciales[TOKEN] (auth)
def test_get_secure_resource_authorized_no_token():
    response = requests.get(f'{BASE_URL}/secure-resource')
    assert response.status_code == 401
    assert isinstance(response.json(), dict)
    assert response.json().get("message") == "Acceso denegado, no autorizado"


# Test: Probando salidas de contenido (data) bajo XML
def test_get_xml_resource():
    response = requests.get(f'{BASE_URL}/xml-resource')
    assert response.status_code == 200
    assert 'application/xml' in response.headers['Content-Type']

    # Datos esperados
    resources = {
        1: {"name": "Resource 1", "type": "Type A"},
        2: {"name": "Resource 2", "type": "Type B"},
        3: {"name": "Resource 3", "type": "Type C"}
    }

    response_text = response.text
    assert "<resources>" in response_text
    assert "</resources>" in response_text

    for resource_id, resource in resources.items():
        assert f"<resource id='{resource_id}'>" in response_text
        assert f"<name>{resource['name']}</name>" in response_text
        assert f"<type>{resource['type']}</type>" in response_text
        assert "</resource>" in response_text
