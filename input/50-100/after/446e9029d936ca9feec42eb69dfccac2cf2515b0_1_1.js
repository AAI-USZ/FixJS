function () {
		ok(testObj.hasOwnProperty('instanceProp'),
			'Instance property should be on instance.');

		equal(testObj.instanceProp, 'instance property',
			'Instance property should be "instance property".');

		ok(!testObj.hasOwnProperty('sharedProp'),
			'Shared prop should NOT be on instance.');

		equal(testObj.sharedProp, 'shared property',
			'Shared property should be "shared property"');

		ok(!testObj.privateProp,
			'Private property should be private.');

		ok(!testObj.hasOwnProperty('getPrivate'),
			'.share() should NOT add methods to instance API.');

		equal(testObj.getPrivate(), 'private property',
			'Private property should be "private property".');
	}