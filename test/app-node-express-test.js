'use strict'
const path = require('path');
const yassert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');
const optionsBluemix = Object.assign({}, require('./resources/bluemix.json'));
const mappings = Object.assign({}, require('./resources/mappings.json'));

const GENERATOR_PATH = '../generators/app/index.js';
const PACKAGE_JSON = 'package.json';
const SERVER_MAPPINGS_JSON = 'server/config/mappings.json';
const SERVER_LOCALDEV_CONFIG_JSON = 'server/localdev-config.json';

describe('node-express', function () {
	this.timeout(10 * 1000); // 10 seconds, Travis might be slow

	before(() => {
		optionsBluemix.backendPlatform = "NODE";
		return helpers
			.run(path.join(__dirname, GENERATOR_PATH))
			.inTmpDir()
			.withOptions({
				bluemix: JSON.stringify(optionsBluemix)
			})
			.then((tmpDir) => {
				console.info("tmpDir", tmpDir);
			});
	});

	it('Can run successful generation and create files', () => {
		yassert.file(PACKAGE_JSON);
		yassert.file('.gitignore');
		yassert.file('server');
		yassert.file('server/config');
		yassert.file(SERVER_MAPPINGS_JSON);
		yassert.file('server/services');
		yassert.file('server/services/index.js');
		yassert.file('server/services/service-manager.js');
		yassert.file(SERVER_LOCALDEV_CONFIG_JSON);
		yassert.fileContent('.gitignore', SERVER_LOCALDEV_CONFIG_JSON);
	});

	it('Can add Apache Spark instrumentation', () => {
		testAll('service-apacheSpark', {
			apacheSpark_cluster_master_url: optionsBluemix.apacheSpark.cluster_master_url,
			apacheSpark_tenant_id: optionsBluemix.apacheSpark.tenant_id,
			apacheSpark_tenant_secret: optionsBluemix.apacheSpark.tenant_secret
		});
	});

	it('Can add AppID/Auth instrumentation', () => {
		testAll('service-auth', {
			auth_tenantId: optionsBluemix.auth.tenantId,
			auth_clientId: optionsBluemix.auth.clientId,
			auth_secret: optionsBluemix.auth.secret,
			auth_oauthServerUrl: optionsBluemix.auth.oauthServerUrl,
			auth_profilesUrl: optionsBluemix.auth.profilesUrl
		}, {
			auth_tenantId: mappings.auth_tenantId,
			auth_clientId: mappings.auth_clientId,
			auth_secret: mappings.auth_secret,
			auth_oauthServerUrl: mappings.auth_oauthServerUrl,
			auth_profilesUrl: mappings.auth_profilesUrl
		});
	});

	it('Can add Cloudant instrumentation', () => {
		testAll('service-cloudant', {
			cloudant_username: optionsBluemix.cloudant[0].username,
			cloudant_password: optionsBluemix.cloudant[0].password,
			cloudant_url: optionsBluemix.cloudant[0].url
		}, {
			cloudant_username: mappings.cloudant_username,
			cloudant_password: mappings.cloudant_password,
			cloudant_url: mappings.cloudant_url
		});
	});

	it('Can add ObjectStorage instrumentation', () => {
		testAll('service-objectStorage', {
			objectStorage_projectId: optionsBluemix.objectStorage[0].projectId,
			objectStorage_userId: optionsBluemix.objectStorage[0].userId,
			objectStorage_password: optionsBluemix.objectStorage[0].password,
			objectStorage_region: optionsBluemix.objectStorage[0].region
		}, {
			objectStorage_projectId: mappings.objectStorage_projectId,
			objectStorage_userId: mappings.objectStorage_userId,
			objectStorage_password: mappings.objectStorage_password,
			objectStorage_region: mappings.objectStorage_region,
			objectStorage_auth_url: mappings.objectStorage_auth_url,
			objectStorage_project: mappings.objectStorage_project,
			objectStorage_domainName: mappings.objectStorage_domainName
		});
	});

	it('Can add DashDB instrumentation', () => {
		testAll('service-dashDb', {
			dashDb_dsn: optionsBluemix.dashDb.dsn,
			dashDb_jdbcurl: optionsBluemix.dashDb.jdbcurl
		}, {
			dashDb_dsn: mappings.dashDb_dsn,
			dashDb_jdbcurl: mappings.dashDb_jdbcurl
		});
	});

	it('Can add DB2 instrumentation', () => {
		testAll('service-db2OnCloud', {
			db2OnCloud_dsn: optionsBluemix.db2OnCloud.dsn,
			db2OnCloud_ssljdbcurl: optionsBluemix.db2OnCloud.ssljdbcurl
		}, {
			db2OnCloud_dsn: mappings.db2OnCloud_dsn,
			db2OnCloud_ssljdbcurl: mappings.db2OnCloud_ssljdbcurl
		});
	});

	it('Can add Finance - Historical Instrument Analytics instrumentation', () => {
		testAll('service-historicalInstrumentAnalytics', {
			historicalInstrumentAnalytics_uri: optionsBluemix.historicalInstrumentAnalytics.uri,
			historicalInstrumentAnalytics_accessToken: optionsBluemix.historicalInstrumentAnalytics.accessToken
		}, {
			historicalInstrumentAnalytics_uri: mappings.historicalInstrumentAnalytics_uri,
			historicalInstrumentAnalytics_accessToken: mappings.historicalInstrumentAnalytics_accessToken
		});

	});

	it('Can add Finance - Instrument Analytics instrumentation', () => {
		testAll('service-instrumentAnalytics', {
			instrumentAnalytics_uri: optionsBluemix.instrumentAnalytics.uri,
			instrumentAnalytics_accessToken: optionsBluemix.instrumentAnalytics.accessToken
		}, {
			instrumentAnalytics_uri: mappings.instrumentAnalytics_uri,
			instrumentAnalytics_accessToken: mappings.instrumentAnalytics_accessToken
		});
	});

	it('Can add Finance - Investment Portfolio instrumentation', () => {
		testAll('service-investmentPortfolio', {
			investmentPortfolio_url: optionsBluemix.investmentPortfolio.url,
			investmentPortfolio_writer_userid: optionsBluemix.investmentPortfolio.writer.userid,
			investmentPortfolio_writer_password: optionsBluemix.investmentPortfolio.writer.password,
			investmentPortfolio_reader_userid: optionsBluemix.investmentPortfolio.reader.userid,
			investmentPortfolio_reader_password: optionsBluemix.investmentPortfolio.reader.password
		}, {
			investmentPortfolio_url: mappings.investmentPortfolio_url,
			investmentPortfolio_writer_userid: mappings.investmentPortfolio_writer_userid,
			investmentPortfolio_writer_password: mappings.investmentPortfolio_writer_password,
			investmentPortfolio_reader_userid: mappings.investmentPortfolio_reader_userid,
			investmentPortfolio_reader_password: mappings.investmentPortfolio_reader_password
		});
	});

	it('Can add Finance - Predictive Market Scenarios instrumentation', () => {
		testAll('service-predictiveMarketScenarios', {
			predictiveMarketScenarios_uri: optionsBluemix.predictiveMarketScenarios.uri,
			predictiveMarketScenarios_accessToken: optionsBluemix.predictiveMarketScenarios.accessToken
		}, {
			predictiveMarketScenarios_uri: mappings.predictiveMarketScenarios_uri,
			predictiveMarketScenarios_accessToken: mappings.predictiveMarketScenarios_accessToken
		});
	});

	it('Can add Finance - Simulated Historical Instrument Analytics instrumentation', () => {
		testAll('service-simulatedHistoricalInstrumentAnalytics', {
			simulatedHistoricalInstrumentAnalytics_uri: optionsBluemix.simulatedHistoricalInstrumentAnalytics.uri,
			simulatedHistoricalInstrumentAnalytics_accessToken: optionsBluemix.simulatedHistoricalInstrumentAnalytics.accessToken
		}, {
			simulatedHistoricalInstrumentAnalytics_uri: mappings.simulatedHistoricalInstrumentAnalytics_uri,
			simulatedHistoricalInstrumentAnalytics_accessToken: mappings.simulatedHistoricalInstrumentAnalytics_accessToken
		});
	});

	it('Can add Finance - Simulated Instrument Analytics instrumentation', () => {
		testAll('service-simulatedInstrumentAnalytics', {
			simulatedInstrumentAnalytics_uri: optionsBluemix.simulatedInstrumentAnalytics.uri,
			simulatedInstrumentAnalytics_accessToken: optionsBluemix.simulatedInstrumentAnalytics.accessToken
		}, {
			simulatedInstrumentAnalytics_uri: mappings.simulatedInstrumentAnalytics_uri,
			simulatedInstrumentAnalytics_accessToken: mappings.simulatedInstrumentAnalytics_accessToken
		});
	});

	it('Can add Watson - Conversation instrumentation', () => {
		testAll('service-conversation', {
			conversation_url: optionsBluemix.conversation.url,
			conversation_username: optionsBluemix.conversation.username,
			conversation_password: optionsBluemix.conversation.password
		}, {
			conversation_url: mappings.conversation_url,
			conversation_username: mappings.conversation_username,
			conversation_password: mappings.conversation_password
		});
	});

	it('Can add Watson - Discovery instrumentation', () => {
		testAll('service-discovery', {
			discovery_url: optionsBluemix.discovery.url,
			discovery_username: optionsBluemix.discovery.username,
			discovery_password: optionsBluemix.discovery.password
		}, {
			discovery_url: mappings.discovery_url,
			discovery_username: mappings.discovery_username,
			discovery_password: mappings.discovery_password
		});
	});

	it('Can add Watson - Document Conversion instrumentation', () => {
		testAll('service-documentConversion', {
			documentConversion_url: optionsBluemix.documentConversion.url,
			documentConversion_username: optionsBluemix.documentConversion.username,
			documentConversion_password: optionsBluemix.documentConversion.password
		}, {
			documentConversion_url: mappings.documentConversion_url,
			documentConversion_username: mappings.documentConversion_username,
			documentConversion_password: mappings.documentConversion_password
		});
	});

	it('Can add Watson - Language Translator instrumentation', () => {
		testAll('service-languageTranslator', {
			languageTranslator_url: optionsBluemix.languageTranslator.url,
			languageTranslator_username: optionsBluemix.languageTranslator.username,
			languageTranslator_password: optionsBluemix.languageTranslator.password
		}, {
			languageTranslator_url: mappings.languageTranslator_url,
			languageTranslator_username: mappings.languageTranslator_username,
			languageTranslator_password: mappings.languageTranslator_password
		});
	});

	it('Can add Watson - Natural Language Classifier instrumentation', () => {
		testAll('service-naturalLanguageClassifier', {
			naturalLanguageClassifier_url: optionsBluemix.naturalLanguageClassifier.url,
			naturalLanguageClassifier_username: optionsBluemix.naturalLanguageClassifier.username,
			naturalLanguageClassifier_password: optionsBluemix.naturalLanguageClassifier.password
		}, {
			naturalLanguageClassifier_url: mappings.naturalLanguageClassifier_url,
			naturalLanguageClassifier_username: mappings.naturalLanguageClassifier_username,
			naturalLanguageClassifier_password: mappings.naturalLanguageClassifier_password
		});
	});

	it('Can add Watson - Natural Language Understanding instrumentation', () => {
		testAll('service-naturalLanguageUnderstanding', {
			naturalLanguageUnderstanding_url: optionsBluemix.naturalLanguageUnderstanding.url,
			naturalLanguageUnderstanding_username: optionsBluemix.naturalLanguageUnderstanding.username,
			naturalLanguageUnderstanding_password: optionsBluemix.naturalLanguageUnderstanding.password
		}, {
			naturalLanguageUnderstanding_url: mappings.naturalLanguageUnderstanding_url,
			naturalLanguageUnderstanding_username: mappings.naturalLanguageUnderstanding_username,
			naturalLanguageUnderstanding_password: mappings.naturalLanguageUnderstanding_password
		});
	});

	it('Can add Watson - Personality Insights instrumentation', () => {
		testAll('service-personalityInsights', {
			personalityInsights_url: optionsBluemix.personalityInsights.url,
			personalityInsights_username: optionsBluemix.personalityInsights.username,
			personalityInsights_password: optionsBluemix.personalityInsights.password
		}, {
			personalityInsights_url: mappings.personalityInsights_url,
			personalityInsights_username: mappings.personalityInsights_username,
			personalityInsights_password: mappings.personalityInsights_password
		});
	});

	it('Can add Watson - Retrieve and Rank instrumentation', () => {
		testAll('service-retrieveAndRank', {
			retrieveAndRank_url: optionsBluemix.retrieveAndRank.url,
			retrieveAndRank_username: optionsBluemix.retrieveAndRank.username,
			retrieveAndRank_password: optionsBluemix.retrieveAndRank.password,
		}, {
			retrieveAndRank_url: mappings.retrieveAndRank_url,
			retrieveAndRank_username: mappings.retrieveAndRank_username,
			retrieveAndRank_password: mappings.retrieveAndRank_password,
		});
	});

	it('Can add Watson - Speech-to-Text instrumentation', () => {
		testAll('service-speechToText', {
			speechToText_url: optionsBluemix.speechToText.url,
			speechToText_username: optionsBluemix.speechToText.username,
			speechToText_password: optionsBluemix.speechToText.password,
		}, {
			speechToText_url: mappings.speechToText_url,
			speechToText_username: mappings.speechToText_username,
			speechToText_password: mappings.speechToText_password,
		});
	});

	it('Can add Watson - Text-to-Speech instrumentation', () => {
		testAll('service-textToSpeech', {
			textToSpeech_url: optionsBluemix.textToSpeech.url,
			textToSpeech_username: optionsBluemix.textToSpeech.username,
			textToSpeech_password: optionsBluemix.textToSpeech.password,
		}, {
			textToSpeech_url: mappings.textToSpeech_url,
			textToSpeech_username: mappings.textToSpeech_username,
			textToSpeech_password: mappings.textToSpeech_password,
		});
	});

	it('Can add Watson - Tone Analyzer instrumentation', () => {
		testAll('service-toneAnalyzer', {
			toneAnalyzer_url: optionsBluemix.toneAnalyzer.url,
			toneAnalyzer_username: optionsBluemix.toneAnalyzer.username,
			toneAnalyzer_password: optionsBluemix.toneAnalyzer.password,
		}, {
			toneAnalyzer_url: mappings.toneAnalyzer_url,
			toneAnalyzer_username: mappings.toneAnalyzer_username,
			toneAnalyzer_password: mappings.toneAnalyzer_password,
		});
	});

	it('Can add Watson - Visual Recognition instrumentation', () => {
		testAll('service-visualRecognition', {
			visualRecognition_url: optionsBluemix.visualRecognition.url,
			visualRecognition_api_key: optionsBluemix.visualRecognition.api_key
		}, {
			visualRecognition_url: mappings.visualRecognition_url,
			visualRecognition_api_key: mappings.visualRecognition_api_key
		});
	});

	it('Can add Weather Insights  instrumentation', () => {
		testAll('service-weatherInsights', {
			weatherInsights_url: optionsBluemix.weatherInsights.url,
			weatherInsights_username: optionsBluemix.weatherInsights.username,
			weatherInsights_password: optionsBluemix.weatherInsights.password
		}, {
			weatherInsights_host: mappings.weatherInsights_host,
			weatherInsights_password: mappings.weatherInsights_password,
			weatherInsights_port: mappings.weatherInsights_port,
			weatherInsights_url: mappings.weatherInsights_url,
			weatherInsights_username: mappings.weatherInsights_username,
		});
	});

	it('Can add Push instrumentation', () => {
		testAll('service-push', {
			push_appGuid: optionsBluemix.push.appGuid,
			push_appSecret: optionsBluemix.push.appSecret,
			push_clientSecret: optionsBluemix.push.clientSecret
		}, {
			push_appGuid: mappings.push_appGuid,
			push_appSecret: mappings.push_appSecret,
			push_clientSecret: mappings.push_clientSecret,
			push_url: mappings.push_url
		});

	});

	it('Can add AlertNotification instrumentation', () => {
		testAll('service-alertNotification', {
			alertNotification_url: optionsBluemix.alertNotification.url,
			alertNotification_name: optionsBluemix.alertNotification.name,
			alertNotification_password: optionsBluemix.alertNotification.password
		}, {
			alertNotification_url: mappings.alertNotification_url,
			alertNotification_name: mappings.alertNotification_name,
			alertNotification_password: mappings.alertNotification_password,
			alertNotification_swaggerui:mappings.alertNotification_swaggerui
		});
	});


	it('Can add MongoDB instrumentation', () => {
		testAll('service-mongodb', {
			mongodb_uri: optionsBluemix.mongodb.uri
		}, {
			mongodb_db_type: mappings.mongodb_db_type,
			mongodb_maps: mappings.mongodb_maps,
			mongodb_name: mappings.mongodb_name,
			mongodb_uri_cli: mappings.mongodb_uri_cli,
			mongodb_ca_certificate_base64: mappings.mongodb_ca_certificate_base64,
			mongodb_deployment_id: mappings.mongodb_deployment_id,
			mongodb_uri: mappings.mongodb_uri
		});
	});

	it('Can add Redis instrumentation', () => {
		testAll('service-redis', {
			redis_uri: optionsBluemix.redis.uri
		}, {
			redis_uri: mappings.redis_uri
		});
	});

	it('Can add Postgre instrumentation', () => {
		testAll('service-postgresql', {
			postgresql_uri: optionsBluemix.postgresql.uri
		}, {
			postgresql_uri: mappings.postgresql_uri,
			postgresql_ca_certificate_base64: mappings.postgresql_ca_certificate_base64,
			postgresql_deployment_id: mappings.postgresql_deployment_id
		});
	});


	it('Can run generation with no services', (done) => {
		for (let key in optionsBluemix) {
			if (key !== 'name' && key !== 'backendPlatform' && key !== 'server') {
				delete optionsBluemix[key];
			}
		}

		helpers
			.run(path.join(__dirname, GENERATOR_PATH))
			.inTmpDir()
			.withOptions({
				bluemix: JSON.stringify(optionsBluemix)
			})
			.then((tmpDir) => {
				console.info(tmpDir);

				// package.json doesn't have any SDKs
				yassert.noFileContent(PACKAGE_JSON, 'appid');
				yassert.noFileContent(PACKAGE_JSON, 'cloudant');
				yassert.noFileContent(PACKAGE_JSON, 'dashdb');
				yassert.noFileContent(PACKAGE_JSON, 'watson-developer-cloud');

				yassert.noFile(SERVER_LOCALDEV_CONFIG_JSON);

				done();
			});
	})
});

function testAll(serviceName, localDevConfigJson, mappingsJson) {
	testServiceDependencies(serviceName);
	testServiceInstrumentation(serviceName);
	testReadMe(serviceName);
	testMappings(mappingsJson || {});
	testLocalDevConfig(localDevConfigJson || {});
}

function testServiceDependencies(serviceName) {
	const filePath = path.join(__dirname, "..", "generators", serviceName, "templates", "node", "dependencies.json");
	const expectedDependencies = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	yassert.jsonFileContent(PACKAGE_JSON, expectedDependencies);
}

function testServiceInstrumentation(serviceName) {
	const expectedRequire = "require('./" + serviceName + "')(app, serviceManager);";
	yassert.fileContent('server/services/index.js', expectedRequire);
	yassert.file('server/services/' + serviceName + '.js');

	const filePath = path.join(__dirname, "..", "generators", serviceName, "templates", "node", "instrumentation.js");
	const expectedInstrumentation = fs.readFileSync(filePath, 'utf-8');
	yassert.fileContent('server/services/' + serviceName + '.js', expectedInstrumentation);
}

//TODO: Need a better way of testing this
function testMappings(json) {
	yassert.jsonFileContent(SERVER_MAPPINGS_JSON, json);
}

function testReadMe(serviceName) {
	yassert.file('docs/services/' + serviceName + '.md');
	const filePath = path.join(__dirname, "..", "generators", serviceName, "templates", "node", "README.md");
	const expectedReadme = fs.readFileSync(filePath, 'utf-8');
	yassert.fileContent('docs/services/' + serviceName + '.md', expectedReadme);
}

function testLocalDevConfig(json) {
	yassert.jsonFileContent(SERVER_LOCALDEV_CONFIG_JSON, json);
}
