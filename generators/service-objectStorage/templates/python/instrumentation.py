from ibmcloudenv import IBMCloudEnv
import swiftclient

authurl = IBMCloudEnv.getString('objectStorage_auth_url')
if not '/v3' in authurl:
    authurl+='/v3'
user = IBMCloudEnv.getString('objectStorage_userId')
key = IBMCloudEnv.getString('objectStorage_password')
os_options = {
    'project_id': IBMCloudEnv.getString('objectStorage_projectId'),
    'user_id': IBMCloudEnv.getString('objectStorage_userId'),
    'region_name': IBMCloudEnv.getString('objectStorage_region')
}

def getService(app):
    objectStorage = swiftclient.Connection(authurl=authurl,user=user,key=key,os_options=os_options, auth_version='3')

    return 'object-storage', objectStorage
