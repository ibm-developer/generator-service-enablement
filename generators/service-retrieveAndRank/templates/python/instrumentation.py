from ibmcloudenv import IBMCloudEnv
from watson_developer_cloud import RetrieveAndRankV1

retrieve_and_rank = RetrieveAndRankV1(
    username=IBMCloudEnv.getString('retrieveAndRank_username'),
    password=IBMCloudEnv.getString('retrieveAndRank_password'))

def getService(app):
    return 'watson-retrieve-and-rank', retrieve_and_rank