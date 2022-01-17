function (/* pattern[...pattern], handler */) {
	if (arguments.length < 2)
		throw new Error('wait(): must have at least 2 arguments: pattern[...pattern], handler')

	var args = this._helper_setArguments([], arguments, 'wait')
		, firstMatch = args[0]
		, handler = args.pop()

	if (firstMatch === 0
	|| typeof firstMatch !== 'number' && firstMatch.length === 0
	)
		throw new Error('wait(): invalid first pattern: ' + firstMatch)

	// Only one pattern
	if (args.length === 1)
		return this.addRule(firstMatch, handler)

	// Many patterns
	var props = this.getProps()
	var atok = this

	function wait_start (matched) {
		atok.offset -= matched
	}

	return atok
		.groupRule(true)
		// Initial check
		.ignore().quiet(true).next()
		.continue( 0, this._helper_getContinueFail(props, 2) )
			.addRule(firstMatch, wait_start)
		// Full check
		.setProps(props)
		.continue( this._helper_getContinueSuccess(props, 2) )
			.addRule.apply(this, args)
		// break the loop and go back to the full check
		.break(true).continue(-2).next()
			.noop()
		.setProps(props)

		.groupRule()
}