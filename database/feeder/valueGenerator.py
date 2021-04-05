from databaseConnection import databaseConnector
from random import randint
import time
import math

def main():
	database = databaseConnector()
	prev = randint(20,70)
	while True:
		sign = randint(0,1)
		delta = randint(0,40)
		if sign==0:
			prev = math.ceil(prev + (delta/100)*prev + 7)%100
		elif sign==1:
			prev = math.ceil(prev - (delta/100)*prev + 3)%100
		print(prev)
		database.insertRow(prev)
		time.sleep(5)

if __name__ == '__main__':
	main()