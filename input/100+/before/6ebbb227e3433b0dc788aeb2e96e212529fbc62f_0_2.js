function(hp) {
			if (hp.pitches !== undefined) {
				var mid = This.lines[This.lineNum].staff[This.staffNum].clef.verticalPos;
				window.ABCJS.parse.each(hp.pitches, function(p) { p.verticalPos = p.pitch - mid; });
			}
			if (hp.gracenotes !== undefined) {
				var mid2 = This.lines[This.lineNum].staff[This.staffNum].clef.verticalPos;
				window.ABCJS.parse.each(hp.gracenotes, function(p) { p.verticalPos = p.pitch - mid2; });
			}
			This.lines[This.lineNum].staff[This.staffNum].voices[This.voiceNum].push(hp);
		}