import requests

# Test: Obtener todos los recursos

BASE_URL = 'http://127.0.0.1:5000'


def test_get_resources():
    response = requests.get(f'{BASE_URL}/resources')
    assert response.status_code == 200
    assert isinstance(response.json(), dict)
