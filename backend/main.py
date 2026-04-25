import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

app = FastAPI(title="VidyaPath Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TAVUS_API_KEY = os.getenv("TAVUS_API_KEY")

groq_client = Groq(api_key=GROQ_API_KEY)

class ExplainRequest(BaseModel):
    topic: str
    language: str
    difficulty: str = "standard"  # standard, simplified, doubt

class DoubtRequest(BaseModel):
    topic: str
    language: str
    question: str

@app.post("/api/generate-video")
async def generate_video(req: ExplainRequest):
    # 1. Generate script using Groq
    try:
        system_prompt = f"You are an expert, friendly teacher for school students. Explain the topic in {req.language} clearly and concisely."
        if req.difficulty == "simplified":
            system_prompt += " Explain it very simply, as if to a 10-year-old. Use easy words."
        
        user_prompt = f"Topic: {req.topic}\n\nPlease provide a short script (under 100 words) that I can read to the student."

        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama-3.3-70b-versatile",
        )
        script = chat_completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

    # 2. Send script to Tavus
    try:
        # First try to get a replica
        headers = {
            "x-api-key": TAVUS_API_KEY,
            "Content-Type": "application/json"
        }
        
        replicas_resp = requests.get("https://tavusapi.com/v2/replicas", headers=headers)
        replica_id = ""
        
        if replicas_resp.status_code == 200:
            replicas_data = replicas_resp.json()
            if "data" in replicas_data and len(replicas_data["data"]) > 0:
                replica_id = replicas_data["data"][0]["replica_id"]
        
        # If no replica is found or the key is invalid, return a mock response for the MVP
        if not replica_id:
            print("Warning: No Tavus replica found or API key invalid. Using mock video.")
            return {
                "script": script,
                "video_url": "https://www.w3schools.com/html/mov_bbb.mp4",
                "status": "mock"
            }

        # Generate video
        video_payload = {
            "replica_id": replica_id,
            "script": script,
            "video_name": f"Explanation for {req.topic}"
        }
        
        video_resp = requests.post("https://tavusapi.com/v2/videos", headers=headers, json=video_payload)
        
        if video_resp.status_code == 200 or video_resp.status_code == 201:
            video_data = video_resp.json()
            return {
                "script": script,
                "video_id": video_data.get("video_id"),
                "status": "generating",
                "message": "Video is being generated. Polling required in production."
            }
        else:
            print(f"Tavus API Error: {video_resp.text}")
            return {
                "script": script,
                "video_url": "https://www.w3schools.com/html/mov_bbb.mp4",
                "status": "mock_fallback_due_to_tavus_error"
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tavus integration error: {str(e)}")

@app.post("/api/ask-doubt")
async def ask_doubt(req: DoubtRequest):
    try:
        system_prompt = f"You are a helpful teacher. Answer the student's doubt about {req.topic} in {req.language} briefly and clearly."
        
        response = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": req.question}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=150,
        )
        answer = response.choices[0].message.content
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
