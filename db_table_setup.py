import mysql.connector
from mysql.connector import errorcode
from project_database import cursor


DB_NAME = "projectbase"

TABLES = {}
 #	tämän taulun(table) tein esim. kirjautumisia varten
 #	eli ei meillä vielä käytössä
TABLES['users'] = (
	"CREATE TABLE `users` ("
	" `id` INT NOT NULL AUTO_INCREMENT,"
	" `fname` VARCHAR(64) NOT NULL,"
	" `lname` VARCHAR(64) NOT NULL,"
	" `email` VARCHAR(64) NOT NULL,"
	" `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,"
	" PRIMARY KEY (`id`)"
	") ENGINE=InnoDB"
)
 #	 Tämä taulu(table) on iltoituksille, mitä nyt käytetään.
TABLES['own'] = (
	"CREATE TABLE `own` ("
	" `id` INT NOT NULL AUTO_INCREMENT,"
	" `ad` VARCHAR(64) NOT NULL,"
	" `title` VARCHAR(64) NOT NULL,"
	" PRIMARY KEY (`id`)"
	") ENGINE=InnoDB"
)

def create_database():	# tietokannan luomista varten
	cursor.execute("CREATE DATABASE IF NOT EXISTS {}".format(DB_NAME))
	print("tietokanta {} luotu!".format(DB_NAME))

def create_tables():	# taulujen(table) luomista varten
	cursor.execute("USE {}".format(DB_NAME))
	# käydään taulut läpi ja luodaan taulu jos ei ole
	for table_name in TABLES: 
		table_description = TABLES[table_name]
		try:
			print("Luotiin taulu ({}) ".format(table_name), end="")
			cursor.execute(table_description)
		except mysql.connector.Error as err:
			if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
				print("Löytyy jo valmiiksi.")
			else:
				print(err.msg)



# create_database() # tietokannan luominen
# create_tables() #	Taulujen luomiseen


