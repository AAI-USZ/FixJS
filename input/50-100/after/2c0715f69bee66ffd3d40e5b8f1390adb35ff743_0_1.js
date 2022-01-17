function closetag (tag) {
		var currentTag = tagNameStack.pop()
		if ( currentTag === tag ) {
			self.emit('closetag', tag)
			atok.offset--
			atokTracker.xx--
			atok.loadRuleSet('closetag')
		} else {
			setError( new Error('Invalid closetag: ' + tag + ' !== ' + currentTag) )(tag)
		}
	}