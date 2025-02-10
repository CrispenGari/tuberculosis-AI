from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from torchvision import models
import warnings
from routers.predictTB import predictTBRouter

warnings.filterwarnings("ignore")


def download_add_cache_models():
    print(" *  DOWNLOADING AND CACHING MODELS")
    models.resnet50(weights=False)
    models.mobilenet_v3_large(weights=False)
    models.densenet201(weights=False)
    print(" *  DONNE DOWNLOADING AND CACHING MODELS")


@asynccontextmanager
async def lifespan(app: FastAPI):
    download_add_cache_models()
    yield


app = FastAPI(
    title="TB Diagnosis API.",
    description="API for diagnosing TB using Deep Leaning.",
    version="1.0.0",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predictTBRouter)


@app.get("/")
def root():
    return JSONResponse(
        {
            "title": "TB Diagnosis API.",
            "description": "API for diagnosing TB using Deep Leaning.",
            "version": "1.0.0",
        },
        status_code=200,
    )
