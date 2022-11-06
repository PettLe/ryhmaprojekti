from project_database import cursor, conn_db

def add_instrument(id, ad, title, ad_content):
	sql = ("INSERT INTO own(ad, title, ad_content) VALUES (%s, %s, %s)")
	cursor.execute(sql,(ad, title, ad_content,))
	conn_db.commit()
	instrument_id = cursor.lastrowid
	print("lisätty logi {}".format(instrument_id))
	
def get_all_instruments():
	sql = ("SELECT * FROM own")
	cursor.execute(sql)
	result = cursor.fetchall()

	for row in result:
		# print(row)
		print(row[1:]) # esimerkiksi, tulostaa soittimet

def get_instrument(id):
	sql = ("SELECT * FROM own WHERE id = %s")
	cursor.execute(sql, (id,))
	result = cursor.fetchone()

	for row in result:
		print(row)

def update_instrument(id, title, ad_content):
	sql = ("UPDATE own SET title = %s, ad_content = %s WHERE id = %s")
	cursor.execute(sql,(title, ad_content, id))
	conn_db.commit()
	print("Soitin päivitetty.")

def delete_instrument(id):
	sql = ("DELETE FROM own WHERE id = %s")
	cursor.execute(sql,(id,))
	conn_db.commit()
	print("Soittimen ilmoitus poistettu.")

# add_instrument(1, 'kitara', 'Gibson', 'Les Paul-1959')
# add_instrument(2, 'rummut', 'Pearl', 'Ei väliä mallista-2018')
# add_instrument(3, 'kitara', 'Fender', 'Telecaster-1969')
# add_instrument(4, 'basso', 'Ibanez', 'Microbass-2020')

# get_all_instruments()

# get_instrument(3) #	hakee id 3 olevan soittimen

# update_instrument(2, "Yamaha", "Parempi kuin Preal-2021")
# delete_instrument(2)
# get_all_instruments()