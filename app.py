import mysql.connector
from project_database import conn_db, cursor
# from flask import MySQL
from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL, MySQLdb
import MySQLdb
# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
app = Flask(__name__)

	# MySQL tietokannan yhteys
# app.config['MYSQL_DATABASE_URL'] = 'mysql://username:password@localhost/projectbase'
# app.config['MYSQL_DATABASE_URL'] = 'mysql://root:deathbase@localhost/own'
# conn_db = mysql.connector.connect(host = "localhost", user = "root",passwd = "deathbase",database = "projectbase")
# cursor = conn_db.cursor()

app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = "deathbase"
app.config['MYSQL_DB'] = "projectbase"
# app.config['MYSQL_CURSORCLASS'] = "DictCursor"

mysql = MySQL(app)
# Käynnistettäessä avaa index.html
@app.route('/')
def home_page():
    return render_template('index.html')

# luo tietueen /data, jonka avulla käsitellään dataa
@app.route('/data', methods=['GET', 'POST'])
def datankasittely():
# conn_db = mysql.connector("project_database")
	if request.method == 'GET':     # GET request
		message = {'greeting':'Hello from Flask!'}
		return jsonify(message)     # serialize and use JSON headers

	if request.method == 'POST':
		# conn_db = mysql.connector()
		cursor = mysql.connection.cursor()    # POST request
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