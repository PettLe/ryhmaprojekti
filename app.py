import mysql.connector
from flask import Flask, render_template, request, jsonify
# from project_database import cursor
from flask_mysqldb import MySQL
from project_database import cursor,cursor
# from main import add_instrument
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
# cursor = mysql.connector()

mysql = MySQL(app)
# Käynnistettäessä avaa index.html
@app.route('/')
def home_page():
    return render_template('index.html')

# luo tietueen /data, jonka avulla käsitellään dataa
@app.route('/data', methods=['GET', 'POST'])
def luo_soitin():
	if request.method == 'GET':     # GET request
		cursor = mysql.connection.cursor()
		sql = "SELECT * FROM own"
		cursor.execute(sql)
		result = cursor.fetchall()

		print(result)
		return result     # serialize and use JSON headers

	if request.method == 'POST':	 # POST request
		cursor = mysql.connection.cursor()   # luo yhteyden db:n
		sql = "INSERT INTO own (ad, title, ad_content) VALUES (%s, %s, %s)" # luodaan tableliin uusi soitin 
		result = request.get_json()	# saadaan frontista json tiedostona
		# result2 = add_instrument(result["valmistaja"],result["malli"],result["vuosi"])
		result2 = (result["valmistaja"],result["malli"], result["vuosi"])	# muotoillaan json tiedosto ymmärrettävään muotoon
		# cursor.execute(result2)	 # suoritetaan käsky db:n
		cursor.execute(sql, result2)	 # suoritetaan käsky db:n
		mysql.connection.commit()	# suoritetaan muutos
		cursor.close()	# suljetaan yhteys
		print(result2)	
		return result
        # return 'Sucesss', 200
		# add_instrument(result2)

# @app.route('/data', methods=['GET', 'POST'])
# def tulosta_soittimet(id):
# 	if request.method =='POST':
# 		sql = ("SELECT * FROM own ")
# 		cursor.execute(sql, (id,))
# 		result = cursor.fetchall()

# 		for row in result:
# 			print(row)


if __name__=="__main__":
	app.run(debug=True)