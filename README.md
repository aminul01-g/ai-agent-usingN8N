# AI Article Summarizer & Insights Agent

An AI-powered system that summarizes articles, extracts key insights, and delivers them via email. Uses n8n for workflow automation, Hugging Face's AI models for text analysis, and integrates with Google Sheets for data storage.

## Project Structure

```
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       └── main.py
├── frontend/
│   ├── next.config.js
│   ├── package.json
│   ├── pages/
│   │   └── index.tsx
│   └── styles/
│       └── globals.css
└── n8n/
    └── workflow.json
```

## Features

- Article URL and email submission through a modern React frontend
- FastAPI backend for request handling and session management
- n8n workflow automation for:
  - Article content extraction
  - AI-powered summarization using Hugging Face's models
  - Key insights extraction
  - Google Sheets data storage
  - Email notifications

## Prerequisites

- Node.js 18+ for frontend
- Python 3.11+ for backend
- n8n installed and running
- Hugging Face API token
- Google Cloud account with Sheets API enabled
- SMTP server for email notifications

## Setup Instructions

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:3000

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Set environment variables:
```bash
export N8N_WEBHOOK_URL="http://localhost:5678/webhook/test"  # Update with your n8n webhook URL
```

Run the backend:
```bash
cd app
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 3. n8n Configuration

1. Import the workflow from `n8n/workflow.json`

2. Configure Environment Variables in n8n:
   - Go to Settings > Environment Variables
   - Add `HF_TOKEN` with your Hugging Face API token

3. Set up Google Sheets Integration:
   - Create a Google Cloud project
   - Enable Google Sheets API
   - Create a service account and download credentials
   - Create a spreadsheet and share it with the service account
   - Configure Google Sheets credentials in n8n

4. Configure Email Settings:
   - Set up SMTP credentials in n8n
   - Update the email node with your SMTP configuration

## Usage

1. Visit http://localhost:3000
2. Enter your email address and an article URL
3. Submit the form
4. The system will:
   - Extract the article content
   - Generate a summary using AI
   - Extract key insights
   - Store the data in Google Sheets
   - Send you an email with the results

## Architecture

```
Frontend (Next.js) -> Backend (FastAPI) -> n8n Workflow
                                          ├─> Article Extraction
                                          ├─> AI Processing (Hugging Face)
                                          ├─> Google Sheets Storage
                                          └─> Email Notification
```

## Environment Variables

### Backend
- `N8N_WEBHOOK_URL`: URL of your n8n webhook

### n8n
- `HF_TOKEN`: Hugging Face API token for AI processing

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

