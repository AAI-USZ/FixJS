function(t){
				var tl = this.tl,
					cue = this.cue;
				if(cue.text == t){ return t; }
				tl.tracker.addAction(new Timeline.Action("update",{
					id:this.uid,
					track:this.track.id,
					initialText:cue.text,
					finalText:t
				}));
				cue.text = t;
				tl.renderTrack(this.track);
				tl.emit('update',this);
				return t;
			}