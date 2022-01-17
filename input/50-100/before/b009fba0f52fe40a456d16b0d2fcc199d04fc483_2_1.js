function float_done () {
		running = false

		// Comply to the tokenizer properties
		if (!isIgnored) {
			if (isQuiet)
				// NB. float may be invalid
				handler( atok.offset - atok.offsetBuffer, -1, null )
			else {
				var num = Number( atok.slice(atok.offsetBuffer, atok.offset) )
				if ( isFinite(num) )
					// Valid float!
					handler(num, -1, null)
				else {
					// Invalid float...abort
					// atok.offset = atok.offsetBuffer
					//TODO
				}
			}
		}

		if (resetOffsetBuffer) atok.offsetBuffer = -1
	}