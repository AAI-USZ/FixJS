function cleanUpSlursInLine(line) {
			var currSlur = [];
			var x;
//			var lyr = null;	// TODO-PER: debugging.

			var addEndSlur = function(obj, num, chordPos) {
				if (currSlur[chordPos] === undefined) {
					// There isn't an exact match for note position, but we'll take any other open slur.
					for (x = 0; x < currSlur.length; x++) {
						if (currSlur[x] !== undefined) {
							chordPos = x;
							break;
						}
					}
					if (currSlur[chordPos] === undefined) {
						var offNum = chordPos*100;
						window.ABCJS.parse.each(obj.endSlur, function(x) { if (offNum === x) --offNum; });
						currSlur[chordPos] = [offNum];
					}
				}
				var slurNum;
				for (var i = 0; i < num; i++) {
					slurNum = currSlur[chordPos].pop();
					obj.endSlur.push(slurNum);
//					lyr.syllable += '<' + slurNum;	// TODO-PER: debugging
				}
				if (currSlur[chordPos].length === 0)
					delete currSlur[chordPos];
				return slurNum;
			};

			var addStartSlur = function(obj, num, chordPos, usedNums) {
				obj.startSlur = [];
				if (currSlur[chordPos] === undefined) {
					currSlur[chordPos] = [];
				}
				var nextNum = chordPos*100+1;
				for (var i = 0; i < num; i++) {
					if (usedNums) {
						window.ABCJS.parse.each(usedNums, function(x) { if (nextNum === x) ++nextNum; });
						window.ABCJS.parse.each(usedNums, function(x) { if (nextNum === x) ++nextNum; });
						window.ABCJS.parse.each(usedNums, function(x) { if (nextNum === x) ++nextNum; });
					}
					window.ABCJS.parse.each(currSlur[chordPos], function(x) { if (nextNum === x) ++nextNum; });
					window.ABCJS.parse.each(currSlur[chordPos], function(x) { if (nextNum === x) ++nextNum; });

					currSlur[chordPos].push(nextNum);
					obj.startSlur.push({ label: nextNum });
//					lyr.syllable += ' ' + nextNum + '>';	// TODO-PER:debugging
					nextNum++;
				}
			};

			for (var i = 0; i < line.length; i++) {
				var el = line[i];
//				if (el.lyric === undefined)	// TODO-PER: debugging
//					el.lyric = [{ divider: '-' }];	// TODO-PER: debugging
//				lyr = el.lyric[0];	// TODO-PER: debugging
//				lyr.syllable = '';	// TODO-PER: debugging
				if (el.el_type === 'note') {
					if (el.gracenotes) {
						for (var g = 0; g < el.gracenotes.length; g++) {
							if (el.gracenotes[g].endSlur) {
								var gg = el.gracenotes[g].endSlur;
								el.gracenotes[g].endSlur = [];
								for (var ggg = 0; ggg < gg; ggg++)
									addEndSlur(el.gracenotes[g], 1, 20);
							}
							if (el.gracenotes[g].startSlur) {
								x = el.gracenotes[g].startSlur;
								addStartSlur(el.gracenotes[g], x, 20);
							}
						}
					}
					if (el.endSlur) {
						x = el.endSlur;
						el.endSlur = [];
						addEndSlur(el, x, 0);
					}
					if (el.startSlur) {
						x = el.startSlur;
						addStartSlur(el, x, 0);
					}
					if (el.pitches) {
						var usedNums = [];
						for (var p = 0; p < el.pitches.length; p++) {
							if (el.pitches[p].endSlur) {
								var k = el.pitches[p].endSlur;
								el.pitches[p].endSlur = [];
								for (var j = 0; j < k; j++) {
									var slurNum = addEndSlur(el.pitches[p], 1, p+1);
									usedNums.push(slurNum);
								}
							}
						}
						for (p = 0; p < el.pitches.length; p++) {
							if (el.pitches[p].startSlur) {
								x = el.pitches[p].startSlur;
								addStartSlur(el.pitches[p], x, p+1, usedNums);
							}
						}
						// Correct for the weird gracenote case where ({g}a) should match.
						// The end slur was already assigned to the note, and needs to be moved to the first note of the graces.
						if (el.gracenotes && el.pitches[0].endSlur && el.pitches[0].endSlur[0] === 100 && el.pitches[0].startSlur) {
							if (el.gracenotes[0].endSlur)
								el.gracenotes[0].endSlur.push(el.pitches[0].startSlur[0].label);
							else
								el.gracenotes[0].endSlur = [el.pitches[0].startSlur[0].label];
							if (el.pitches[0].endSlur.length === 1)
								delete el.pitches[0].endSlur;
							else if (el.pitches[0].endSlur[0] === 100)
								el.pitches[0].endSlur.shift();
							else if (el.pitches[0].endSlur[el.pitches[0].endSlur.length-1] === 100)
								el.pitches[0].endSlur.pop();
							if (currSlur[1].length === 1)
								delete currSlur[1];
							else
								currSlur[1].pop();
						}
					}
				}
			}
		}