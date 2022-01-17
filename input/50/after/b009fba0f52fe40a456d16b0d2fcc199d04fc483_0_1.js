function floatListParser () {
	atok.float()
		.ignore(true)
		.addRule(1, 'space')
		.on('data', console.log)
}