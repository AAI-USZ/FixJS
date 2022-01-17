function testInsertMultiLine () {
	Wasavi.send('aa\nb\nc\n\u001b');
	assertEquals('#1', 'normal', Wasavi.state);
	assertEquals('#2', 'command', Wasavi.inputMode);

	Wasavi.send('u');
	assertEquals('#3', '1 operation have reverted.', Wasavi.lastMessage);
	assertEquals('#4', '', Wasavi.value);

	Wasavi.send('\u0012');
	assertEquals('#5', '1 operation have executed again.', Wasavi.lastMessage);
	assertEquals('#6', 'a\nb\nc\n', Wasavi.value);
}