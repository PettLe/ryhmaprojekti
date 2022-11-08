from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import mysql.connector
# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
from project_database import cursor, conn_db
app = Flask(__name__)

	# MySQL tietokannan yhteys
# app.config['SQLALCHEMY_DATABASE_URL'] = 'mysql://username:password@localhost/projectbase'
# app.config['SQLALCHEMY_DATABASE_URL'] = 'mysql://root:deathbase@localhost/own'
# conn_db = mysql.connector("project_database.py")
# cursor = conn_db.cursor()

app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = "deathbase"
app.config['MYSQL_DB'] = "database"
app.config['MYSQL_CURSORCLASS'] = "DictCursor"
cursor = mysql.connection.cursor()
# cursor.execute("SELECT * FROM own")
mysql = MySQL(app)
# Käynnistettäessä avaa index.html
@app.route('/')
def home_page():
    return render_template('index.html')

# luo tietueen /data, jonka avulla käsitellään dataa
@app.route('/data', methods=['GET', 'POST'])
def datankasittely():
	# conn_db = mysql.connector("project_database.py")
    if request.method == 'GET':     # GET request
        message = {'greeting':'Hello from Flask!'}

		
        return jsonify(message)     # serialize and use JSON headers

    if request.method == 'POST':    # POST request
     sql = "INSERT INTO own (ad, title, ad_content) VALUES (%s, %s, %s)"
     result = request.get_json()
     result2 = (result["valmistaja"],result["malli"], result["vuosi"])
     cursor.execute(sql, result2)
     mysql.connection.commit()
     cursor.close()
     print(result2)
     return result
        # return 'Sucesss', 200

if __name__=="__main__":
	app.run(debug=True)