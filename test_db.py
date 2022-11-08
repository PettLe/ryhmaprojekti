import mysql.connector

# # Batabase yhteyden muodostus listana
# config = {
# 	'host': "localhost",
# 	'user': "root",
# 	'password': "",
# 	'database': "db_project" # Uusi database nimi 
# }
# conn_db = mysql.connector.connect(**config)

# cursor = conn_db.cursor()

# conn_db.commit()

conn = mysql.connector.connect( # Database yhteyden muodostus
	host = "localhost",
	user = "root",
	password = "deathbase",
	database = "projectbase"
)
# print(conn) # Testaus toimiiko yhteys
# print("Toimii")
mycursor = conn.cursor()

	# batabasen luominen mysql:ään
# mycursor.execute("CREATE DATABASE IF NOT EXISTS projectbase")

	# tämä luo taulun(table) tietokantaan
mycursor.execute("""
CREATE TABLE IF NOT EXISTS own (
id INT AUTO_INCREMENT PRIMARY KEY,
ad VARCHAR(64),
title VARCHAR(64),
ad_content VARCHAR(200)
);
""")

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
conn.commit()
conn.close()