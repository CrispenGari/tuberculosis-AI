from fastapi import APIRouter, File
from fastapi.responses import JSONResponse
from typing import Annotated
from models import densenet201, mobilenetv3, resnet50, predict_tb, device
import time

allowed_models = {
    "resnet50": resnet50,
    "mobilenetv3": mobilenetv3,
    "densenet201": densenet201,
}

predictTBRouter = APIRouter(prefix="/api/v1/tb")


@predictTBRouter.post("/predict/{model_name}")
def predict_tb_(model_name: str, xray: Annotated[bytes, File()]):
    start = time.time()
    if model_name.strip().lower() not in allowed_models.keys():
        JSONResponse(
            {
                "time": time.time() - start,
                "ok": False,
                "field": "model_name",
                "status": "error",
                "message": f"The model name specified is not found from the allowed models ({', '.join(allowed_models)}).",
            },
            status_code=200,
        )
    try:
        prediction = predict_tb(allowed_models[model_name], xray, device=device)
        return JSONResponse(
            {
                "time": time.time() - start,
                "ok": True,
                "status": "ok",
                "prediction": prediction,
                'model': model_name
            },
            status_code=200,
        )
    except Exception:
        JSONResponse(
            {
                "time": time.time() - start,
                "ok": False,
                "field": "server",
                "status": "error",
                "message": "Internal Server Error.",
            },
            status_code=500,
        )
