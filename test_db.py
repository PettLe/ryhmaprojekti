import mysql.connector

conn = mysql.connector.connect( # Database yhteyden muodostus
	host = "localhost",
	user = "root",
	password = "",
	database = "projectbase"
)

# print(conn) # Testaus toimiiko yhteys

cursor = conn.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS projectbase")

cursor.execute("""
CREATE TABLE IF NOT EXISTS person (
person_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(64),
last_name VARCHAR(64),
email VARCHAR(64)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS instrument (
instrument_id INT AUTO_INCREMENT PRIMARY KEY,
guitars VARCHAR(64),
bassguitars VARCHAR(64),
drums VARCHAR(64)
);
""")

cursor.execute("SHOW TABLES")

for table in cursor:
	print(table)

conn.commit()