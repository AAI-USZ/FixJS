function(interrupt, instance) {
			var target, replacement;

			var margin = SoundJS.activePlugin.FT || 0;

			for (var i=0, l=this.max||100; i<l; i++) {
				target = this.get(i);

				// Available Space
				if (target == null) {
					return true;
				} else if (interrupt == SoundJS.INTERRUPT_NONE) {
					continue;
				}

				// First replacement candidate
				if (i == 0) {
					replacement = target;
					continue;
				}

				// Audio is complete or not playing
				if (target.playState == SoundJS.PLAY_FINISHED ||
						target == SoundJS.PLAY_INTERRUPTED ||
						target == SoundJS.PLAY_FAILED) {
					replacement = target;

				// Audio is a better candidate than the current target, according to playhead
				} else if (
						(interrupt == SoundJS.INTERRUPT_EARLY && target.getPosition() < replacement.getPosition()) ||
						(interrupt == SoundJS.INTERRUPT_LATE && target.getPosition() > replacement.getPosition())) {
					replacement = target;
				}
			}

			if (replacement != null) {
				replacement.interrupt();
				this.remove(replacement);
				return true;
			}
			return false;
		}