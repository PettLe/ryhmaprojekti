from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Käynnistettäessä avaa index.html
@app.route('/')
def home_page():
    return render_template('index.html')

# luo tietueen /data, jonka avulla käsitellään dataa
@app.route('/data', methods=['GET', 'POST'])
def datankasittely():    
    if request.method == 'GET':     # GET request
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)     # serialize and use JSON headers
    if request.method == 'POST':    # POST request
        print(request.data)
        return request.get_json()
        # return 'Sucesss', 200

app.run(debug=True)