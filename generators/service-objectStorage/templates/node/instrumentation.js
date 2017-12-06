var IBMCloudEnv = require('ibm-cloud-env');
var ObjectStorage = require('bluemix-objectstorage').ObjectStorage;

module.exports = function(app, serviceManager){
	var region = IBMCloudEnv.getString("objectStorage_region");
	switch (region){
		case "dallas": region = ObjectStorage.Region.DALLAS; break;
		case "london": region = ObjectStorage.Region.LONDON; break;
		default: throw "Invalid Object Storage Region: " + region
	}

	var objStorage = new ObjectStorage({
		projectId: IBMCloudEnv.getString("objectStorage_projectId"),
		userId: IBMCloudEnv.getString("objectStorage_userId"),
		password: IBMCloudEnv.getString("objectStorage_password"),
		region: region
	});

	serviceManager.set("object-storage", objStorage);
};


