function (/* pattern[...pattern], handler */) {
	if (arguments.length < 2)
		throw new Error('wait(): must have at least 2 arguments: pattern[...pattern], handler')

	var args = this._helper_setArguments([''], arguments, 'wait')
		, firstMatch = args[0]

	if ( !/number|string/.test(typeof firstMatch) )
		throw new Error('wait(): Invalid first pattern type (must be number/string): ' + (typeof firstMatch))

	var atok = this
	var props = atok.getProps()

	function wait_start (matched) {
		atok.offset -= matched
	}

	// Expect a number of bytes
	if (typeof firstMatch === 'number') {
		if (firstMatch === 0)
			return atok.addRule.apply(this, args)

		var firstMatchCheck = (firstMatch > 1)

		atok
			.groupRule(true)
			.ignore().quiet(true).break().next()
			.trimLeft()

		// If expecting 1 byte, we already have it since rule is running
		if (firstMatchCheck)
			atok
				.continue(1, 0)
						// If not enough data, wait for some
						.addRule(firstMatch, wait_start)
					.break(true).continue(-2)
						.noop()

		// Full check
		atok
				.setProps(props)
				.continue(
					this._helper_continueSuccess(props, 1, -1 -firstMatchCheck)
				)
					.addRule.apply(this, args)
				// break the loop and go back to the full check
				.break(true).continue(-2).next()
					.noop()

		return atok
			.setProps(props)
			.groupRule()
	}

	// First pattern empty or single pattern of size 1
	if ( !firstMatch.hasOwnProperty('length') )
		throw new Error('wait(): Invalid first pattern type (no length): ' + firstMatch)

	var firstMatchLength = firstMatch.length

	if ( firstMatchLength === 0 || (args.length === 2 && firstMatchLength === 1) )
		return atok.addRule.apply(this, args)

	atok
		.groupRule(true)
		.ignore().quiet(true).break().next()
		.trimLeft()


	if (args.length === 2) {
		// Only 1 pattern
		atok
			// Not enough data for firstMatch, wait for some
			.continue(1, 0)
				.addRule(firstMatchLength, wait_start)
			.break(true).continue(-2)
				.noop()
			.break()
			.setProps(props)
			.continue( 0, this._helper_continueFailure(props, 0, -3) )
				.addRule(firstMatch, args[1])

	} else {
		// Optimization:
		// .trimLeft(true).addRule(a, ...) <=> addRule('', ...)
		if (props.trimLeft) args[0] = ''

		if (firstMatchLength === 1) {
			// Many patterns
			atok
				.ignore( props.trimLeft )
				.continue( 0, this._helper_continueFailure(props, 2, 0) )
					.addRule(firstMatch, wait_start)

				.setProps(props)
				.continue(
					this._helper_continueSuccess(props, 1, -1)
				)
					.addRule.apply(this, args)
				// break the loop and go back to the full check
				.break(true).continue(-2).next()
					.noop()

		} else {
			// Many patterns with first one of size > 1
			atok
				// First match check...
				// size > 1
				.continue(1, 0)
					// If not enough data to validate the firstMatch, wait for some
					.addRule(firstMatchLength, wait_start)
				.break(true).continue(-2)
					.noop()
				.ignore( props.trimLeft )
				.continue( 0, this._helper_continueFailure(props, 2, -3) )
					.addRule(firstMatch, wait_start)

				// Full check
				.setProps(props)
				.continue(
					this._helper_continueSuccess(props, 1, -4)
				)
					.addRule.apply(this, args)
				// break the loop and go back to the full check
				.break(true).continue(-2).next()
					.noop()
		}
	}

	return atok
		.setProps(props)
		.groupRule()
}