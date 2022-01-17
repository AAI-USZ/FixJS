function() {
	equal( QUnit.current_testEnvironment, this, 'The current testEnvironment is global');
	equal( makeurl(), 'http://example.com/search?q=a%20search%20test', 'makeurl returns a default url if nothing specified in the testEnvironment');
}