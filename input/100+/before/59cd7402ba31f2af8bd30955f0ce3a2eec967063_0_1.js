function(text, maxlen, options) {
	'use strict'

	if (!options) {
		options = {}
	}

	var f = this.internal.getFont(options.fontName, options.fontStyle)
	, fsize = options.fontSize || this.internal.getFontSize()
	, widths = {0:1000}
	, kerning = {}
	, metricsIsFractionOf = 1
	, encoding = 'Unicode'
	// NOT UTF8, NOT UTF16BE/LE, NOT UCS2BE/LE
	// Actual JavaScript-native String's 16bit char codes used.
	// no multi-byte logic here

	// if you want "encoded" text split, roll separate function, add char mapping tables etc.

	if (f.metadata[encoding]) {
		widths = f.metadata[encoding].widths || widths
		kerning = f.metadata[encoding].kerning || kerning
	}

	// first we split on end-of-line chars
	var paragraphs 
	if (text.match(/[\n\r]/)) {
		paragraphs = text.split(/\r\n|\r|\n/g)
	} else {
		paragraphs = [text]
	}

	// now we convert size (max length of line) into "font size units"
	// at present time, the "font size unit" is always 'point'
	// 'proportional' means, "in proportion to font size"
	var fontunit_maxlen = 1.0 * this.internal.scaleFactor * maxlen / fsize
	// at this time, fsize is always in "points" regardless of the default measurement unit of the doc.
	// this may change in the future?
	// until then, proportional_maxlen is likely to be in 'points'

	var i, l
	, output = []
	for (i = 0, l = paragraphs.length; i < l; i++) {
		output = output.concat(
			splitParagraphIntoLines(
				paragraphs[i]
				, fontunit_maxlen
				, {'widths':widths, 'kerning':kerning}
			)
		)
	}

	return output 
}