import io
import torch
import torchvision.transforms as transforms
from PIL import Image

from api.model.model import Model


model = Model()


def transform_image(image_bytes):
    transform = transforms.Compose(
        [
            transforms.Resize((224,) * 2),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )
    image = Image.open(io.BytesIO(image_bytes))
    image_tensor = transform(image)
    image_tensor = image_tensor.unsqueeze(0)
    return image_tensor


def get_prediction(image_tensor):
    outputs = model(image_tensor)
    probability, prediction = torch.max(outputs.data, 1)
    return probability, prediction
