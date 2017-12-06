var IBMCloudEnv = require('ibm-cloud-env');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

module.exports = function(app, serviceManager){
    var personalityInsights = new PersonalityInsightsV3({
	    url: IBMCloudEnv.getString('personalityInsights_url'),
	    username: IBMCloudEnv.getString('personalityInsights_username'),
        password: IBMCloudEnv.getString('personalityInsights_password'),
        version_date: '2016-10-19'
    });
    serviceManager.set("watson-personality-insights", personalityInsights);
};