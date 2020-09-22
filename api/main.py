import json
from flask import Flask, request, jsonify

from api.torch_utils import transform_image, get_prediction


app = Flask(__name__)


with open("api/imagenet_class_index.json", mode="r") as f:
    labels = json.load(f)
    labels = {key: value[1] for key, value in labels.items()}


ALLOWED_EXTENTIONS = {"png", "jpg", "jpeg"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENTIONS


def main_post():
    file = request.files.get("image")
    if file is None or file.filename == "":
        return jsonify(dict(error="no file"))
    if not allowed_file(file.filename):
        return jsonify(dict(error="format not supported"))
    data = dict(probability=0, prediction="", error="")
    try:
        data["error"] = "Error on reading file."
        image_bytes = file.read()
        data["error"] = "Error during prediction."
        image_tensor = transform_image(image_bytes)
        probability, prediction = get_prediction(image_tensor)
        data["probability"] = probability.item()
        data["prediction"] = labels[str(prediction.item())]
        data["error"] = ""
        return jsonify(data)
    except:
        return jsonify(data)


@app.route("/api/predict", methods=["POST"])
def main():
    if request.method == "POST":
        return main_post()


if __name__ == "__main__":
    app.run()
