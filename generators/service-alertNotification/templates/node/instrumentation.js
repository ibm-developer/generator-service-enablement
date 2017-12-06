
const IBMCloudEnv = require('ibm-cloud-env');

module.exports = function(app, serviceManager){
	const config = {
		url : IBMCloudEnv.getString('alertNotification_url') ||  'https://ibmnotifybm.mybluemix.net/api/alerts/v1',
		username : IBMCloudEnv.getString('alertNotification_name') || '',
		password : IBMCloudEnv.getString('alertNotification_password') || ''
	};

	serviceManager.set('alert-notification', config);
};

