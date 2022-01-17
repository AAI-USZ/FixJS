function (testModule) {
	$.fx.off = true;
	jasmine.getFixtures().fixturesPath = 'fixtures';
	jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
	jasmine.getEnv().execute();
}