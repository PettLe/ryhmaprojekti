import mysql.connector
from flask import Flask, render_template, request, jsonify
# from project_database import cursor
from flask_mysqldb import MySQL
from project_database import conn_db,config
# from main import add_instrument
# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
# from mysql_functions import get_all_instruments
app = Flask(__name__)

# MySQL tietokannan yhteys
# app.config['MYSQL_DATABASE_URL'] = 'mysql://username:password@localhost/projectbase'
# app.config['MYSQL_DATABASE_URL'] = 'mysql://root:deathbase@localhost/own'
# conn_db = mysql.connector.connect(host = "localhost", user = "root",passwd = "deathbase",database = "projectbase")
cursor = conn_db.cursor()

app.config['MYSQL_HOST'] = config["host"]
app.config['MYSQL_USER'] = config["user"]
app.config['MYSQL_PASSWORD'] = config["password"]
app.config['MYSQL_DB'] = config["database"]
# app.config['MYSQL_CURSORCLASS'] = "DictCursor"
# cursor = mysql.connector()
mysql = MySQL(app)

# Käytetty luomaan kaksi uutta columnia
# query = "ALTER TABLE own \
#         ADD uniqueID VARCHAR(250) \
#         AFTER id"
# query2 = "ALTER TABLE own \
#         ADD type VARCHAR(50) \
#         AFTER uniqueID"

# cursor.execute(query)
# cursor.execute(query2)

# Funktio ei toiminut (ristikutsuja) ellei sitä sijoittanut tänne.
def get_all_instruments():
	cursor = mysql.connection.cursor()
	soittimet = {}
	sql = ("SELECT * FROM own")
	cursor.execute(sql)
	result = cursor.fetchall()
	kitarat = []
	bassot = []
	rummut = []

	for row in result:
		soitin = {}
		soitin['uniqueID'] = row[1]
		soitin['instrument'] = row[2]
		soitin['valmistaja'] = row[3]
		soitin['malli'] = row[4]
		soitin['vuosi'] = row[5]
		if soitin['instrument'] == "kitara":
			kitarat.append(soitin)
		elif soitin['instrument'] == "basso":
			bassot.append(soitin)
		elif soitin['instrument'] == "rummut":
			rummut.append(soitin)
		else:
			kitarat.append(soitin)
	soittimet['kitarat'] = kitarat
	soittimet['bassot'] = bassot
	soittimet['rummut'] = rummut
	return soittimet

# Käynnistettäessä avaa index.html
@app.route('/')
def home_page():
	return render_template('index.html')

# luo tietueen /data, jonka avulla käsitellään dataa
@app.route('/data', methods=['GET', 'POST'])
def luo_soitin():
	if request.method == 'GET':     # GET request
		print("Tapahtui GET request")
		return jsonify(get_all_instruments())     # serialize and use JSON headers

	if request.method == 'POST':	 # POST request
		cursor = mysql.connection.cursor()   # luo yhteyden db:n
		sql = "INSERT INTO own (uniqueID, instrument, ad, title, ad_content) VALUES (%s, %s, %s, %s, %s)" # luodaan tableliin uusi soitin 
		result = request.get_json()	# saadaan frontista json tiedostona
		result2 = (result["uid"], result["tyyppi"], result["valmistaja"], result["malli"], result["vuosi"])	# muotoillaan json tiedosto ymmärrettävään muotoon
		cursor.execute(sql, result2)	 # suoritetaan käsky db:n
		mysql.connection.commit()	# suoritetaan muutos
		cursor.close()	# suljetaan yhteys
		print(result2)	
		return result
  
@app.route('/delete', methods=['GET', 'POST'])
def poista_soitin():
	id = request.get_json()	# Saadaan poistettavan kohteen ID JavaScriptiltä
	if request.method == 'POST':
		sql = ("DELETE FROM own WHERE uniqueID = %s")
		cursor.execute(sql,(id,))
		conn_db.commit()
		print(id)
		print("Soittimen ilmoitus poistettu.")
		return id

# @app.route()

if __name__=="__main__":
	app.run(debug=True)