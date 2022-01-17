function () {
		ok(typeof testFactory === 'function',
			'.factory() method produces valid functions.');


		ok(o1.hasOwnProperty('instanceProp'),
			'Instance property should be on instance.');

		equal(o1.instanceProp, 'instance property',
			'Instance property should be "instance property".');

		ok(!o1.hasOwnProperty('sharedProp'),
			'Shared prop should NOT be on instance.');

		equal(o1.sharedProp, 'shared property',
			'Shared property should be "shared property"');

		ok(!o1.privateProp,
			'Private property should be private.');

		ok(!o1.hasOwnProperty('getPrivate'),
			'.share() should NOT add methods to instance API.');

		equal(o1.getPrivate(), 'private property',
			'Private property should be "private property".');

		ok(!o1.hasOwnProperty('shared'),
			'.share() should NOT add methods to instance API.');

		equal(o1.shared, 3,
			'.shared should be 3.');

		equal(o1.count(), 0,
			'.count() should be 0.');



		ok(o2.hasOwnProperty('instanceProp'),
			'Instance property should be on instance.');

		equal(o2.instanceProp, 2,
			'Instance property should be "2".');


		ok(o2.hasOwnProperty('name'),
			'.name should be on instance.');

		equal(o2.name, 'Danny Dance',
			'.name should be "Danny Dance".');


		ok(!o2.hasOwnProperty('sharedProp'),
			'Shared prop should NOT be on instance.');

		equal(o2.sharedProp, 'shared property',
			'Shared property should be "shared property"');

		ok(!o2.privateProp,
			'Private property should be private.');

		ok(!o2.hasOwnProperty('getPrivate'),
			'.share() should NOT add methods to instance API.');

		equal(o2.getPrivate(), 'private property',
			'Private property should be "private property".');

		ok(!o2.hasOwnProperty('shared'),
			'.share() should NOT add methods to instance API.');

		equal(o2.shared, 3,
			'.shared should be 3.');

		equal(o2.count(), 6,
			'.count() should be 6');


		o2.count(1);
		equal(o2.count(), 7,
			'.count() should be 7');

		equal(o1.count(), 0,
			'o1.count() should be unchanged.');
	}