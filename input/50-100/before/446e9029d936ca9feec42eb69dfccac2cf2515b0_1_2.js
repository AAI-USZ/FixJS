function () {
		ok(testObj2.hasOwnProperty('instanceProp'),
			'Instance property should be on instance.'
		);
		equal(testObj2.instanceProp, 'instance property 2',
			'Instance property should be "instance property 2".'
		);
		ok(!testObj2.hasOwnProperty('sharedProp'),
			'Shared prop should NOT be on instance.'
		);
		equal(testObj2.sharedProp, 'shared property 2',
			'Shared property should be "shared property 2"'
		);
		ok(!testObj2.privateProp,
			'Private property should be private.'
		);
		ok(!testObj2.hasOwnProperty('getPrivate'),
			'.plugin() should NOT add methods to instance API.'
		);
		equal(testObj2.getPrivate(), 'private property 2',
			'Private property should be "private property 2".'
		);
	}