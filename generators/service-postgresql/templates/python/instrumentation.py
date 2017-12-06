from ibmcloudenv import IBMCloudEnv
import psycopg2

url = IBMCloudEnv.getString('postgresql_uri')

def getService(app):
    client = psycopg2.connect(url)
    return 'postgre-client', client
