import torch
import torchvision.models as models


def create_model():
    def _create_model():
        Model = models.mobilenet_v2
        model = Model(pretrained=False)
        model.load_state_dict(torch.load("api/model/mobilenet_v2-b0353104.pth"))
        model.eval()
        return model

    return _create_model


Model = create_model()
