function(defWidth, defLength, barsperstaff, staffnonote) {
		this.closeLine();	// Close the last line.

		// Remove any blank lines
		var anyDeleted = false;
		var i, s, v;
		for (i = 0; i < this.lines.length; i++) {
			if (this.lines[i].staff !== undefined) {
				var hasAny = false;
				for (s = 0; s < this.lines[i].staff.length; s++) {
					if (this.lines[i].staff[s] === undefined) {
						anyDeleted = true;
						this.lines[i].staff[s] = null;
						//this.lines[i].staff[s] = { voices: []};	// TODO-PER: There was a part missing in the abc music. How should we recover?
					} else {
						for (v = 0; v < this.lines[i].staff[s].voices.length; v++) {
							if (this.lines[i].staff[s].voices[v] === undefined)
								this.lines[i].staff[s].voices[v] = [];	// TODO-PER: There was a part missing in the abc music. How should we recover?
							else
								if (this.containsNotes(this.lines[i].staff[s].voices[v])) hasAny = true;
						}
					}
				}
				if (!hasAny) {
					this.lines[i] = null;
					anyDeleted = true;
				}
			}
		}
		if (anyDeleted) {
			this.lines = window.ABCJS.parse.compact(this.lines);
			window.ABCJS.parse.each(this.lines, function(line) {
				if (line.staff)
					line.staff = window.ABCJS.parse.compact(line.staff);
			});
		}

		// if we exceeded the number of bars allowed on a line, then force a new line
		if (barsperstaff) {
			for (i = 0; i < this.lines.length; i++) {
				if (this.lines[i].staff !== undefined) {
					for (s = 0; s < this.lines[i].staff.length; s++) {
						for (v = 0; v < this.lines[i].staff[s].voices.length; v++) {
							var barNumThisLine = 0;
							for (var n = 0; n < this.lines[i].staff[s].voices[v].length; n++) {
								if (this.lines[i].staff[s].voices[v][n].el_type === 'bar') {
									barNumThisLine++;
									if (barNumThisLine >= barsperstaff) {
										// push everything else to the next line, if there is anything else,
										// and there is a next line. If there isn't a next line, create one.
										if (n < this.lines[i].staff[s].voices[v].length - 1) {
											if (i === this.lines.length - 1) {
												var cp = JSON.parse(JSON.stringify(this.lines[i]));
												this.lines.push(window.ABCJS.parse.clone(cp));
												for (var ss = 0; ss < this.lines[i+1].staff.length; ss++) {
													for (var vv = 0; vv < this.lines[i+1].staff[ss].voices.length; vv++)
														this.lines[i+1].staff[ss].voices[vv] = [];
												}
											}
											var startElement = n + 1;
											var section = this.lines[i].staff[s].voices[v].slice(startElement);
											this.lines[i].staff[s].voices[v] = this.lines[i].staff[s].voices[v].slice(0, startElement);
											this.lines[i+1].staff[s].voices[v] = section.concat(this.lines[i+1].staff[s].voices[v]);
										}
									}
								}
							}

						}
					}
				}
			}
		}

		// If we were passed staffnonote, then we want to get rid of all staffs that contain only rests.
		if (barsperstaff) {
			anyDeleted = false;
			for (i = 0; i < this.lines.length; i++) {
				if (this.lines[i].staff !== undefined) {
					for (s = 0; s < this.lines[i].staff.length; s++) {
						var keepThis = false;
						for (v = 0; v < this.lines[i].staff[s].voices.length; v++) {
							if (this.containsNotesStrict(this.lines[i].staff[s].voices[v])) {
								keepThis = true;
							}
						}
						if (!keepThis) {
							anyDeleted = true;
							this.lines[i].staff[s] = null;
						}
					}
				}
			}
			if (anyDeleted) {
				window.ABCJS.parse.each(this.lines, function(line) {
					if (line.staff)
						line.staff = window.ABCJS.parse.compact(line.staff);
				});
			}
		}

		// Remove the temporary working variables
		for (i = 0; i < this.lines.length; i++) {
			if (this.lines[i].staff) {
				for (s = 0; s < this.lines[i].staff.length; s++)
						delete this.lines[i].staff[s].workingClef;
			}
		}

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

		// TODO-PER: This could be done faster as we go instead of as the last step.
		function fixClefPlacement(el) {
			//if (el.el_type === 'clef') {
				var min = -2;
				var max = 5;
				switch(el.type) {
					case 'treble+8':
					case 'treble-8':
						break;
					case 'bass':
					case 'bass+8':
					case 'bass-8':
						el.verticalPos = 20 + el.verticalPos; min += 6; max += 6;
						break;
					case 'tenor':
					case 'tenor+8':
					case 'tenor-8':
						el.verticalPos = - el.verticalPos; min = -40; max = 40;
//						el.verticalPos+=2; min += 6; max += 6;
						break;
					case 'alto':
					case 'alto+8':
					case 'alto-8':
						el.verticalPos = - el.verticalPos; min = -40; max = 40;
//						el.verticalPos-=2; min += 4; max += 4;
						break;
				}
				if (el.verticalPos < min) {
					while (el.verticalPos < min)
						el.verticalPos += 7;
				} else if (el.verticalPos > max) {
					while (el.verticalPos > max)
						el.verticalPos -= 7;
				}
			//}
		}

		for (this.lineNum = 0; this.lineNum < this.lines.length; this.lineNum++) {
			if (this.lines[this.lineNum].staff) for (this.staffNum = 0; this.staffNum < this.lines[this.lineNum].staff.length; this.staffNum++) {
				if (this.lines[this.lineNum].staff[this.staffNum].clef)
					fixClefPlacement(this.lines[this.lineNum].staff[this.staffNum].clef);
				for (this.voiceNum = 0; this.voiceNum < this.lines[this.lineNum].staff[this.staffNum].voices.length; this.voiceNum++) {
//					var el = this.getLastNote();
//					if (el) el.end_beam = true;
					cleanUpSlursInLine(this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum]);
					for (var j = 0; j < this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum].length; j++)
						if (this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum][j].el_type === 'clef')
							fixClefPlacement(this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum][j]);
				}
			}
		}

		if (!this.formatting.pagewidth)
			this.formatting.pagewidth = defWidth;
		if (!this.formatting.pageheight)
			this.formatting.pageheight = defLength;

		// Remove temporary variables that the outside doesn't need to know about
		delete this.staffNum;
		delete this.voiceNum;
		delete this.lineNum;
		delete this.potentialStartBeam;
		delete this.potentialEndBeam;
		delete this.vskipPending;
	}