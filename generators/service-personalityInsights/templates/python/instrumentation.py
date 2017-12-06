from ibmcloudenv import IBMCloudEnv
from watson_developer_cloud import PersonalityInsightsV3

personality_insights = PersonalityInsightsV3(
    username=IBMCloudEnv.getString('personalityInsights_username'),
    password=IBMCloudEnv.getString('personalityInsights_password'),
    version='2016-10-20')

def getService(app):
    return 'watson-personality-insights', personality_insights