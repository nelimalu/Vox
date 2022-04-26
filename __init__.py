from flask import Flask, url_for, render_template, request
import json

app = Flask(__name__)
app.secret_key = "supersecretkey"

messages = []


@app.route("/")
def home():
	return render_template("index.html")


@app.route('/getmessages')
def send_message_data():
	return json.dumps(messages)


@app.route('/sendmessage', methods=['POST'])
def get_message_data():
    data = request.form['data']
    messages.append(data)

    if len(messages) > 200:
    	messages.pop(0)

    return data


if __name__ == "__main__":
	app.run(debug=False, host='0.0.0.0')
