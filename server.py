from io import BytesIO
from sanic import Sanic
from sanic.response import json,file
import tensorflow as tf
import numpy as np
import keras
from PIL import Image
from sanic import response
from sanic.request import Request,File

class_names = ['Liverpool', 'Manchester City', 'Manchester United']

app = Sanic("Learning-Premier-League")

model = tf.keras.models.load_model('my_model.keras')

@app.post("/find")
def callModel(request):
    file_name = request.json.get('file_name')
    # picture = request.files.get('Logo')
    # print(picture)
    image = 'frontend/public/uploads/'+ file_name
    # image = request.files.get('Premium')

    print("called")
    print(image)
    print("get image2")
    IMG_SIZE = 160

    image = keras.utils.load_img(image, target_size=(IMG_SIZE,IMG_SIZE))
    input_arr = keras.utils.img_to_array(image)
    input_arr = np.array([image]) 
    input_arr = (input_arr/127.5) - 1
    predict_dataset = tf.convert_to_tensor(input_arr)

    predictions = model(predict_dataset, training=False)
    probs = tf.nn.softmax(predictions)

    class_indexes = tf.argmax(probs, axis = 1).numpy()
    results = []

    for i, class_idx in enumerate(class_indexes):
        name = class_names[class_idx]
        print(class_names)
        p = np.max(probs[i].numpy())
        results.append({
            "name": name,
            "probability": float(p),
            "file_name":file_name
        })
        print('complete find club')

    return json({ "data": results })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, single_process=True)


    