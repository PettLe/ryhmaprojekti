from project_database import cursor, conn_db

def add_instrument(id, ad, title, ad_content):
	sql = ("INSERT INTO own(ad, title, ad_content) VALUES (%s, %s, %s)")
	cursor.execute(sql,(ad, title, ad_content,))
	conn_db.commit()
	log_id = cursor.lastrowid
	print("lisätty logi {}".format(log_id))
	return log_id
# add_instrument(1, 'kitara', 'Gibson', 'Les Paul-1959')
# add_instrument(2, 'rummut', 'Pearl', 'Ei väliä mallista-2018')
# add_instrument(3, 'kitara', 'Fender', 'Telecaster-1969')
# add_instrument(4, 'basso', 'Ibanez', 'Microbass-2020')

def get_all_instruments():
	sql = ("SELECT * FROM own")
	cursor.execute(sql)
	result = cursor.fetchall()

	for row in result:
		print(row)

# get_all_instruments()