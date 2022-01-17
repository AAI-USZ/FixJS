function xmlParser (options) {
	// XML special entities
	var entityRex = /&(.+?);/mg
	// Modify ENTITIES as required (only typical subset defined here)
	var entityToCodeMap = this.ENTITIES = { apos: 0x0027, quot: 0x0022, amp: 0x0026, lt: 0x003C, gt: 0x003E, nbsp: 0x00A0 }

	// Parser variables
	var nameCharSet = { start: 'aA0_:-.', end: 'zZ9_:-.' }
	var tagNameStack = []		// Current tag hierarchy
	var attrName = null			// Current attribute name
	var procName = null			// Current processing instruction name

	function entityToCode (str, ent) {
		return String.fromCharCode(
			ent[0] !== '#'
				? entityToCodeMap[ent]
				: ent[1] === 'x'
					? parseInt(ent.substr(2), 16)
					: parseInt(ent.substr(1), 10)
		)
	}
	function decodeValue (v) {
		return v.replace(entityRex, entityToCode)
	}

	function setProcInst (name) {
		procName = name
	}
	function procInst (body) {
		self.emit('processinginstruction', { name: procName, body: body })
		procName = null
	}
	function initdoctype (n) {
		atok.offset -= 9			// Trick to leverage the match() helper
	}
	function doctype (n) {
		// Rule ran with quiet(), so we only perform one slice()
		self.emit(
			'doctype'
		, atok.buffer.slice( atok.offset - n + 8, atok.offset - 1 )
		)
	}
	function attrFound (attr, idx) {
		attr.value = decodeValue( attr.value )
		self.emit('attribute', attr)
		attrName = null
		// Unquoted value?
		if (idx >= 0) {
			atok.offset--
			atokTracker.xx--
		}
	}
	function opentag (tag) {
		tagNameStack.push(tag)
		self.emit('opentag', tag)
		atok.offset--
		atokTracker.xx--
	}
	function selfclosetag () {
		self.emit('closetag', tagNameStack.pop())
	}
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
	function setError (err) {
		return function (data) {
			// error() is a pre defined function to format the error and pause the stream
			self.pause()
			self.emit('error', error(err, data))
			// Initialize
			atok.clear(true).loadRuleSet('main')
		}
	}

	// Expect a tag - wait() is used we know there must be a tag (starting or ending)
	function getTag (handler) {
		return atok.wait('', { firstOf: '>/ \t\n\r' }, handler)
	}

	atok
		// Main loop
		.whitespace()
		.ignore(true).next('starttag')
			.addRule('<', 'starttag')
		.ignore()
			.addRule('', '<', function text (data) { self.emit('text', decodeValue(data)) })
		.saveRuleSet('main')

		// Opening/closing tag
		.clearRule()
		.next('special').ignore(true)
			.addRule('!', 'special')
		.next().ignore()
		.continue(0, 1).ignore(true)
				.addRule('/', 'closetag')
		.continue().ignore()

	getTag(closetag)
		.next('attributes')

	getTag(opentag)
		.saveRuleSet('starttag')

		.clearRule()
		.next('main')
			.wait('--', '-->', function comment (c) { self.emit('comment', c) })
		.next('cdata').quiet(true)
			.addRule('[CDATA[', function opencdata () { self.emit('opencdata') })
		.next('doctype')
			.addRule('DOCTYPE', initdoctype)
		.next().quiet()
				.addRule( setError(new Error('Parse error: invalid ! tag')) )
		.saveRuleSet('special')

		// Emit the CDATA in chunks
		.clearRule()
		.next('main')
			.addRule(']]>', function emptycdata (c) { self.emit('closecdata') })
			.addRule('', ']]>', function trailingcdata (c) { self.emit('cdata', c); self.emit('closecdata') })
		.next()
			.addRule('', function cdata (c) { self.emit('cdata', c) })
		.saveRuleSet('cdata')

		// Process the DOCTYPE
		.clearRule()
		.next('main').quiet(true)
			.match('<', '>', doctype)
		.saveRuleSet('doctype')

		// Tag attributes
		.clearRule()
		.whitespace()
		.next('main')
			.ignore(true)
				.addRule('>', 'tag')
			.ignore()
		.saveRuleSet('closetag')
			.addRule('/>', selfclosetag)
		.next()
		// Attributes do not support non ASCII characters
		.nvp(nameCharSet, '=', { firstOf: '/> \t\n\r' }, attrFound)
		.saveRuleSet('attributes')
		
		// Processing instruction
		.clearRule()
		.whitespace()
		.continue(0).ignore(true)
			.addRule({ start: 256, end: Infinity }, 'non-ascii')
		.continue(1, 0)
			.addRule('<?', 'pi')
		.continue()
		// No PI, start parsing
		.ignore().next('main')
			.noop()
		// PI
		.continue(0, 1).next()
			.chunk(nameCharSet, setProcInst)
		.continue()
		.next('main')
			.wait('', '?>', procInst)
		.next()
			.addRule( setError(new Error('Parse error: invalid ? tag')) )
}