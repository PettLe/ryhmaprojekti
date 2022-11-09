import mysql.connector

# # Tietokannan yhteyden muodostus dictionarina
# config = {
# 	'host': "localhost",
# 	'user': "root",
# 	'password': "deathbase",
# 	'database': "projectbase" # Uusi database nimi 
# }
# conn_db = mysql.connector.connect(**config)

# cursor = conn_db.cursor()

#	***************************** testailuja ja käytännön kokeiluja **************************

# conn_db.commit()

conn_db = mysql.connector.connect( # Database yhteyden muodostus
	host = "localhost",
	user = "root",
	password = "deathbase",
	database = "projectbase"
)
# conn_db.close()
# print(conn_db) # Testaus toimiiko yhteys
# conn_db = mysql.connector.connect()
cursor = conn_db.cursor()
# print(cursor)

# 	# batabasen luominen mysql:ään
# mycursor.execute("CREATE DATABASE IF NOT EXISTS projectbase")

	# tämä luo taulun(table) tietokantaan
# mycursor.execute("""
# CREATE TABLE IF NOT EXISTS own (
# id INT AUTO_INCREMENT PRIMARY KEY,
# ad VARCHAR(64),
# title VARCHAR(64),
# ad_content VARCHAR(200)
# );
# """)

# mycursor.execute("""
# CREATE TABLE IF NOT EXISTS instrument (
# instrument_id INT AUTO_INCREMENT PRIMARY KEY,
# guitars VARCHAR(64),
# bassguitars VARCHAR(64),
# drums VARCHAR(64)
# );
# """)

# mycursor.execute("SHOW TABLES")

# # for table in mycursor:
# # 	print(table)

# sql = "INSERT INTO person (id, first_name, last_name, email) VALUES (%d, %s, %s, %s)"
# val = (8, "Muumi", "Keskinen", "axel.keskinen@email.com")
# mycursor.execute(sql, val)

# conn.commit()

# print(mycursor.rowcount, "record inserted.")
conn_db.commit()
# conn_db.close()