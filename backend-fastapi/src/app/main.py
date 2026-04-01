import os

from fastapi.responses import FileResponse
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.analysis import router as analysis_router
from app.routes.auth import router as auth_router
from app.routes.post import router as institution_router

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 단계 OK
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API 라우터
app.include_router(institution_router, prefix="/api")
app.include_router(analysis_router, prefix="/api")
app.include_router(auth_router, prefix="/api")


# "/" → "/static"으로 변경해줌~
app.mount("/static", StaticFiles(directory="./src/app/static"), name="static")


@app.get("/")
def root():
    return {"message": "API is running"}


if __name__ == "__main__":
    uvicorn.run("src.app.main:app", host="0.0.0.0", port=8000, reload=True)