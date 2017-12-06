var IBMCloudEnv = require('ibm-cloud-env');
var NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');

module.exports = function(app, serviceManager){
    var naturalLanguageClassifier = new NaturalLanguageClassifierV1({
	    url: IBMCloudEnv.getString('naturalLanguageClassifier_url'),
	    username: IBMCloudEnv.getString('naturalLanguageClassifier_username'),
        password: IBMCloudEnv.getString('naturalLanguageClassifier_password')
    });
    serviceManager.set("watson-natural-language-classifier", naturalLanguageClassifier);
};