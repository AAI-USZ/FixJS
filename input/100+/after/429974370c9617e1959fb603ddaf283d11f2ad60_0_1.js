function(s) {
			var suite = new s.Suite(),
				result_suite = {
					name: s.name,
					duration: undefined,

					total: 0,
					pass: 0,
					fail: 0,
					error: 0,

					tests: []
				},
				suite_start_time = Date.now(),
				test_start_time,
				result_test;
			
			for (var test_name in suite) {
				if (/^test/.test(test_name)) {
					test_start_time = Date.now();
					
					result_test = {
						name: test_name
					};
					
					try {
						result_suite.total++;
						window.chook.results.total++;
						
						if ("setUp" in suite) {
							suite["setUp"]();
						}

						suite[test_name]();
						
						if ("tearDown" in suite) {
							suite["tearDown"]();
						}
						
						result_suite.pass++;
						window.chook.results.pass++;
						result_test.status = 'pass';
						result_test.duration = Date.now() - test_start_time;

						console.log('chook.pass:' + JSON.stringify(result_test));
					} catch(e) {
						if(e.name === "AssertError") {
							result_suite.fail++;
							window.chook.results.fail++;
							result_test.status = 'fail';
						} else {
							result_suite.error++;
							window.chook.results.error++;
							result_test.status = 'error';
						}

						result_test.error = e;
						result_test.duration = Date.now() - test_start_time;
						
						console.log('chook.' + result_test.status + ':' + JSON.stringify(result_test));
					}
						
					result_suite.tests.push(result_test);
				}
			}

			result_suite.duration = Date.now() - suite_start_time;

			window.chook.results.suites.push(result_suite);
		}