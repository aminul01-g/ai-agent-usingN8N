from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, HttpUrl
import uuid, requests, os

app = FastAPI()
N8N_WEBHOOK_URL = os.getenv('N8N_WEBHOOK_URL', 'http://localhost:5678/webhook/test')
TIMEOUT = 5

class UserRequest(BaseModel):
    email: EmailStr
    article_url: HttpUrl

@app.post('/submit')
def submit(req: UserRequest):
    session_id = str(uuid.uuid4())
    payload = {'session_id': session_id, 'email': req.email, 'article_url': req.article_url}
    try:
        r = requests.post(N8N_WEBHOOK_URL, json=payload, timeout=TIMEOUT)
        r.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f'Failed to send to n8n: {e}')
    return { 'session_id': session_id, 'status': 'processing' }