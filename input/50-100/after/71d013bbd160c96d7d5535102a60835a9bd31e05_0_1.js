function match_done (matched) {
		if (!isIgnored) {
			// Mimic trimRight() behaviour
			var offset = atok.offset - ( props.trimRight ? matched : 0 )
			handler(
				isQuiet
					? offset - atok.markedOffset
					: atok.slice(atok.markedOffset, offset)
			, -1
			, null
			)
		}
		if (resetMarkedOffset) atok.markedOffset = -1
	}