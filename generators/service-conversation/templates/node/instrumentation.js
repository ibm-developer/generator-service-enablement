var IBMCloudEnv = require('ibm-cloud-env');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

module.exports = function(app, serviceManager){
    var conversation = new ConversationV1({
        url: IBMCloudEnv.getString('conversation_url'),
        username: IBMCloudEnv.getString('conversation_username'),
        password: IBMCloudEnv.getString('conversation_password'),
        version_date: ConversationV1.VERSION_DATE_2017_04_21
    });
    serviceManager.set("watson-conversation", conversation);
};
