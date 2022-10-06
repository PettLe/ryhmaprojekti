from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
print("WUHUU")
@app.route('/')
def home_page():
    return render_template('index.html')
    
@app.route('/data', methods=['GET', 'POST'])
def testfn():    # GET request
    if request.method == 'GET':
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers    # POST request
    if request.method == 'POST':
        print(request.get_json())  # parse as JSON
        return 'Sucesss', 200
# if __name__=='__main__':
app.run(debug=True)