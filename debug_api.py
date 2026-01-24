import requests
try:
    response = requests.get('http://localhost:8000/api/quotations/current/')
    print(f"Status Code: {response.status_code}")
    if response.status_code == 500:
        print("Response Content (Preview):")
        print(response.text[:2000])
except Exception as e:
    print(f"Request failed: {e}")
