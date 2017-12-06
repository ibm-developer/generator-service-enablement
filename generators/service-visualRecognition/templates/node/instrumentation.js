var IBMCloudEnv = require('ibm-cloud-env');
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

module.exports = function(app, serviceManager){
    var visualRecognition = new VisualRecognitionV3({
	    url: IBMCloudEnv.getString('visualRecognition_url'),
	    api_key: IBMCloudEnv.getString('visualRecognition_api_key'),
        version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
    });
    serviceManager.set("watson-visual-recognition", visualRecognition);
};