import MySQLdb as mdb
import sys
class databaseConnector(object):
    def __init__(self):
        try:
            self.db = mdb.connect(user='root',passwd='',db='internProject',unix_socket='/opt/lampp/var/mysql/mysql.sock')
            self.cur = self.db.cursor()
        except mdb.Error as e:
            print('Failed To Connect Database')
            sys.exit(1)
        print('Database Connected')

    def insertRow(self, value):
        #with self.cur:
        #self.cur.execute(f"INSERT INTO timeValue (Time,Value) VALUES (current_timestamp,'{value}')")
        self.cur.execute(f"INSERT INTO timeValue (Time,Value) VALUES (now(),'{value}')")
        self.db.commit()