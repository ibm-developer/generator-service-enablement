var IBMCloudEnv = require('ibm-cloud-env');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

module.exports = function(app, serviceManager){
    var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
	    url: IBMCloudEnv.getString('naturalLanguageUnderstanding_url'),
	    username: IBMCloudEnv.getString('naturalLanguageUnderstanding_username'),
        password: IBMCloudEnv.getString('naturalLanguageUnderstanding_password'),
        version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
    });
    serviceManager.set("watson-natural-language-understanding", naturalLanguageUnderstanding);
};