import os
import random
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import textwrap
import re

# Load environment variables
load_dotenv()

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

# Initialize FastAPI
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://ap-tourism.vercel.app/", "https://ap-tourism-api.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq Client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# System message defining the assistant's role
SYSTEM_PROMPT = (
    "You are an expert travel agent specializing in Andhra Pradesh, India. "
    "You MUST provide detailed travel plans including:\n"
    "1. A structured **day-wise itinerary** (morning, afternoon, evening activities).\n"
    "2. **Transportation options and costs** (trains, buses, taxis, etc.).\n"
    "3. **Accommodation recommendations** for budget and premium travelers.\n"
    "4. **Estimated total costs** broken down into transport, stay, food, and sightseeing.\n"
    "5. **Local food recommendations** with must-try dishes.\n"
    "6. **Alternative routes or hidden gems** if available.\n\n"
    "If a query is unrelated to Andhra Pradesh travel, reply with: 'I only provide travel assistance for Andhra Pradesh.'"
)

# Travel-related keywords for filtering
TRAVEL_KEYWORDS = [
    "trip", "travel", "hotel", "itinerary", "stay", "budget", "places", "destination",
    "vacation", "holiday", "tour", "sightseeing", "package", "transportation", "cost", "resort"
]

# Greeting keywords with regex patterns
GREETING_PATTERNS = [
    r'\b(hi)\b',
    r'\b(hello)\b',
    r'\b(hey)\b',
    r'\b(hola)\b',
    r'\b(hi there)\b',
    r'\b(greetings)\b',
    r'\b(howdy)\b',
    r'\b(good\s*(morning|afternoon|evening))\b'
]

# Request model
class PromptRequest(BaseModel):
    prompt: str

# Function to check if the prompt is a greeting
def is_greeting(prompt: str) -> bool:
    prompt_lower = prompt.lower().strip()
    
    # Use regex to match greetings more precisely
    for pattern in GREETING_PATTERNS:
        if re.search(pattern, prompt_lower):
            return True
    
    return False

# Function to generate a greeting response
def generate_greeting_response(prompt: str) -> str:
    prompt_lower = prompt.lower().strip()
    
    # Personalized greetings based on time of day or specific greeting
    if re.search(r'\b(good\s*morning)\b', prompt_lower):
        return "Good morning! How can I help you plan your Andhra Pradesh travel today?"
    elif re.search(r'\b(good\s*afternoon)\b', prompt_lower):
        return "Good afternoon! Ready to explore the beautiful destinations of Andhra Pradesh?"
    elif re.search(r'\b(good\s*evening)\b', prompt_lower):
        return "Good evening! Excited to assist you with your travel plans?"
    else:
        # Generic greeting responses
        responses = [
            "Hello there! I'm your Andhra Pradesh travel assistant. How can I help you today?",
            "Hi! Ready to discover the amazing travel opportunities in Andhra Pradesh?",
            "Greetings! I'm here to help you plan an unforgettable trip.",
            "Hey there! Excited to assist you with your Andhra Pradesh travel plans."
        ]
        return random.choice(responses)

# Function to check query relevance
def is_relevant(prompt: str) -> bool:
    prompt_lower = prompt.lower()
    return any(keyword in prompt_lower for keyword in TRAVEL_KEYWORDS)

@app.get("/")
async def read_root():
    return {"message": "AI API is running"}

@app.post("/plan-trip")
async def plan_trip(request: PromptRequest):
    # Check if the prompt is a greeting first
    if is_greeting(request.prompt):
        response = generate_greeting_response(request.prompt)
        return {"response": response}

    # Check if the query is related to travel
    if not is_relevant(request.prompt):
        return {"response": "I only provide travel assistance for Andhra Pradesh."}

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": request.prompt}
            ],
            model="llama-3.3-70b-versatile",
        )
        response_text = chat_completion.choices[0].message.content
        
        # Improve formatting
        formatted_response = format_travel_response(response_text)
        
        return {"response": formatted_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def format_travel_response(text):
    """
    Improve the formatting of the travel response
    """
    # Define sections to format
    sections = [
        "Day-wise Itinerary",
        "Transportation Options and Costs",
        "Accommodation Recommendations",
        "Estimated Total Costs",
        "Local Food Recommendations",
        "Alternative Routes or Hidden Gems"
    ]
    
    # Ensure each section is properly formatted with markdown
    for section in sections:
        text = text.replace(section + ":", f"## {section}")
    
    # Ensure consistent formatting for sublists
    text = text.replace("- ", "* ")
    
    # Remove any excessive whitespace
    text = textwrap.dedent(text).strip()
    
    return text