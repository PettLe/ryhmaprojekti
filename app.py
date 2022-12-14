import mysql.connector
from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
from project_database import conn_db,config

app = Flask(__name__)


cursor = conn_db.cursor()

# Haetaan configit, jotka on piilotettuna toisessa tiedostossa
app.config['MYSQL_HOST'] = config["host"]
app.config['MYSQL_USER'] = config["user"]
app.config['MYSQL_PASSWORD'] = config["password"]
app.config['MYSQL_DB'] = config["database"]

mysql = MySQL(app)

# Käytetty luomaan kaksi uutta columnia
# query = "ALTER TABLE own \
#         ADD uniqueID VARCHAR(250) \
#         AFTER id"
# query2 = "ALTER TABLE own \
#         ADD instrument VARCHAR(50) \
#         AFTER uniqueID"

# cursor.execute(query)
# cursor.execute(query2)

# Haetaan kaikki soittimet mySQL:stä
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
		return result
  
@app.route('/delete', methods=['GET', 'POST'])
def poista_soitin():
	id = request.get_json()	# Saadaan poistettavan kohteen ID JavaScriptiltä
	if request.method == 'POST':
		sql = ("DELETE FROM own WHERE uniqueID = %s")
		cursor.execute(sql,(id,))
		conn_db.commit()
		return id


if __name__=="__main__":
	app.run(debug=True)