import pandas as pd
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

import sarimaalgo

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def hello():
    message = {"message": "hello"}
    return jsonify(message)


@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files.getlist("csv")[0]
    if not file:
        return jsonify({"error": "no file uploaded"})
    print(request.values.get("periodicity"))
    print(request.values.get("periods"))
    df = pd.read_csv(file.stream, index_col='Date', parse_dates=True)
    res, path = sarimaalgo.main(request.values.get("periodicity"), request.values.get("periods"), df)
    return jsonify({"img": res, "file_path": f'/download/{path}'})


@app.route('/download/<path:filename>', methods=['GET'])
def download_file(filename):
    directory = 'result/'  # Specify the directory path
    return send_from_directory(directory, filename, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
