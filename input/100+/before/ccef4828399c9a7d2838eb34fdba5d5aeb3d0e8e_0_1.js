function testInsertToIsolatedPosition () {
	Wasavi.send('ifoobarbaz\u001b');

	Wasavi.send('4|iFOO', 
		Wasavi.SPECIAL_KEYS.RIGHT,
		Wasavi.SPECIAL_KEYS.RIGHT,
		Wasavi.SPECIAL_KEYS.RIGHT,
		'BAR\nBAZ',
		'\u001b');
	assertEquals('#1-1', 'fooFOObarBAR\nBAZbaz', Wasavi.value);

	Wasavi.send('u');
	assertEquals('#2-1', 'fooFOObarbaz', Wasavi.value);

	Wasavi.send('u');
	assertEquals('#3-1', 'foobarbaz', Wasavi.value);

	Wasavi.send('u');
	assertEquals('#4-1', '', Wasavi.value);

	Wasavi.send('u');
	assertEquals('#5-1', '', Wasavi.value);
	assert('#5-2', Wasavi.lastMessage != '');

	Wasavi.send('\u0012');
	assertEquals('#6-1', 'foobarbaz', Wasavi.value);

	Wasavi.send('\u0012');
	assertEquals('#7-1', 'fooFOObarbaz', Wasavi.value);

	Wasavi.send('\u0012');
	assertEquals('#8-1', 'fooFOObarBAR\nBAZbaz', Wasavi.value);

	Wasavi.send('\u0012');
	assertEquals('#8-1', 'fooFOObarBAR\nBAZbaz', Wasavi.value);
	assert('#8-2', Wasavi.lastMessage != '');
}