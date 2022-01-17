function(Global, undefined) {



	function escapeInvalidXmlChars(str) {

		return str.replace(/\&/g, "&amp;")

					.replace(/</g, "&lt;")

					.replace(/\>/g, "&gt;")

					.replace(/\"/g, "&quot;")

					.replace(/\'/g, "&apos;");

	};



	function removeInvalidFileChars(str) {

		return str.replace(/\s/g, "-")

					.replace(/\\/g, "")

					.replace(/\//g, "")

					.replace(/:/g, "")

					.replace(/\*/g, "")

					.replace(/\?/g, "")

					.replace(/\"/g, "")

					.replace(/\'/g, "")

					.replace(/</g, "")

					.replace(/\>/g, "")

					.replace(/\|/g, "");

	};



	if (Global.TestRunner) {

		Global.TestRunner.Reporters.JUnit = function(outputfolder) {

			var reporter = function() {

				this.__outputfolder = outputfolder;

			};



			reporter.prototype = Global.TestRunner.Reporters.JUnit.prototype;



			return new reporter();

		}



		Global.TestRunner.Reporters.JUnit.prototype = {

			generate: function(totals) {



				for (var moduleName in totals.modules) {

					var jUnitXmlOutput = '<?xml version="1.0" encoding="utf-8" standalone="no"?>\n<!--This file represents the results of running a test suite-->\n';

					var module = totals.modules[moduleName];



					jUnitXmlOutput += '<testsuite name="'+ escapeInvalidXmlChars(moduleName) +'' +

						'" errors="0" tests="' + totals.total + '" failures="' + totals.failed +

						'" time="' + totals.runtime + '">\n';



					for (var testName in module.tests) {

						var test = module.tests[testName];



						for (var assertName in test.asserts) {

							var assert = test.asserts[assertName];

							var assertParts = (assert.message || assert).split(' Expected')

							var assertMsg = assertParts[0];

							var assertExpect = 'Expected' + (assertParts.length > 1 ? assertParts[1] : assertParts[0]);



							jUnitXmlOutput += '\t<testcase classname="' + escapeInvalidXmlChars(testName) + '" name="' + escapeInvalidXmlChars(assertMsg) + '" time="' + test.runtime + '"';



							if (!assert.result) {

								jUnitXmlOutput += '>\n\t\t<failure>' + assertExpect + '</failure>\n\t</testcase>\n';

							} else {

								jUnitXmlOutput += ' />\n';

							}

						}

					}



					jUnitXmlOutput += "</testsuite>\n";



					this.__writeOutFile(moduleName, jUnitXmlOutput);

				}

			},



			__writeOutFile: function(moduleName, jUnitXmlOutput) {

				var file = fs.open( this.__getOutputFilePath(moduleName), 'w' );

					file.write( jUnitXmlOutput );

					file.close();

			},



			__getOutputFilePath: function(moduleName) {

				return this.__outputfolder +'/'+ removeInvalidFileChars(moduleName) +'.junit.xml';

			}

		};

	}



}