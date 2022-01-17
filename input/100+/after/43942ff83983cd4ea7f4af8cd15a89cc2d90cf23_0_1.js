function (wordStart, handler) {
	var atok = this
	var resetMarkedOffset = false	// First helper to set the markedOffset value?
	var running = false				// Current helper running

	var props = atok.getProps()
	var isQuiet = props.quiet
	var isIgnored = props.ignore

	function _helper_start () {
		running = true
		// Prevent buffer slicing by atok
		resetMarkedOffset = (atok.markedOffset < 0)
		if (resetMarkedOffset) atok.markedOffset = atok.offset - 1
	}
	function _helper_done () {
		running = false
		if (!isIgnored)
			handler(
				isQuiet
					? atok.offset - atok.markedOffset
					: atok.slice(atok.markedOffset, atok.offset)
			, -1
			, null
			)

		if (resetMarkedOffset) atok.markedOffset = -1
	}
	function _helper_end () {
		if (running) _helper_done()
	}

	return atok
		.once('end', _helper_end)

		.groupRule(true)
		// Match / no match
		.ignore()			// The handler needs to fire
		.quiet(true)	// Data doesnt matter
		.next()				// Dont change ruleSet
		.break()			// Dont exit the loop
		.continue( 0, this._helper_continueFailure(props, 2, 0) )
		.addRule(wordStart, _helper_start)

		// while(character matches a word letter)
		.continue(-1).ignore(true)
			.addRule(wordStart, '_helper_wordCheck')

		// Word parsed, reset the properties except ignore and quiet
		.setProps(props).ignore().quiet(true)
		.continue( this._helper_continueSuccess(props, 0, 2) )
		.addRule(_helper_done)

		.setProps(props)
		.groupRule()
}