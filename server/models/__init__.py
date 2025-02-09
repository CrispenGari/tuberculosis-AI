import torch
import os
import io

from torch.nn import functional as F
from torchvision import transforms
import numpy as np
from PIL import Image
from torchvision import models
from torch import nn


OUTPUT_DIM = 1
class_names = ["Normal", "Tuberculosis"]
means = torch.tensor([0.5012, 0.5096, 0.5124])
stds = torch.tensor([0.2359, 0.2381, 0.2392])
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
pretrained_size = 224

resnet50_path = os.path.join(os.getcwd(), "models/static/tb-resnet50.pt")
mobilenetv3_path = os.path.join(os.getcwd(), "models/static/tb-mobilenetv3.pt")
densenet201_path = os.path.join(os.getcwd(), "models/static/tb-densenet201.pt")


print(" *  LOADING MODELS")
resnet50 = models.resnet50(weights=False).to(device)
resnet50.fc = nn.Linear(resnet50.fc.in_features, OUTPUT_DIM).to(device)
resnet50.load_state_dict(torch.load(resnet50_path, map_location=device))


mobilenetv3 = models.mobilenet_v3_large(weights=False).to(device)
mobilenetv3.classifier[-1] = nn.Linear(
    mobilenetv3.classifier[-1].in_features, OUTPUT_DIM
).to(device)
mobilenetv3.load_state_dict(torch.load(mobilenetv3_path, map_location=device))

densenet201 = models.densenet201(weights=False).to(device)
densenet201.classifier = nn.Linear(densenet201.classifier.in_features, OUTPUT_DIM).to(
    device
)
densenet201.load_state_dict(torch.load(densenet201_path, map_location=device))
print("\n *  LOADING MODELS COMPLETE")

image_transforms = {
    "test": transforms.Compose(
        [
            transforms.Resize(pretrained_size),
            transforms.ToTensor(),
            transforms.Normalize(mean=means, std=stds),
        ]
    ),
}


def preprocess_img(img):
    """
    takes in an image path and pre process it
    """
    img = image_transforms["test"](Image.open(io.BytesIO(img)).convert("RGB"))
    return img


def predict_tb(model, image, device):
    image = preprocess_img(image)
    image = torch.unsqueeze(image, 0).to(device)
    model.eval()
    with torch.no_grad():
        pred = F.sigmoid(model(image).squeeze().cpu()).item()
        predicted_label = 1 if pred >= 0.5 else 0
        confidence = pred if pred >= 0.5 else 1 - pred
        res = {
            "label": predicted_label,
            "class_label": class_names[predicted_label],
            "probability": float(np.round(confidence, 2)),
        }
        return res
