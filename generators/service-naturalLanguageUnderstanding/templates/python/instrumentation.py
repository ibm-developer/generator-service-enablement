from ibmcloudenv import IBMCloudEnv
from watson_developer_cloud import NaturalLanguageUnderstandingV1

natural_language_understanding = NaturalLanguageUnderstandingV1(
    username=IBMCloudEnv.getString('naturalLanguageUnderstanding_username'),
    password=IBMCloudEnv.getString('naturalLanguageUnderstanding_password'),
    version='2017-02-27')

def getService(app):
    return 'watson-natural-language-understanding', natural_language_understanding