function(offset, loop, volume, pan) {
			this.loop = loop;
			this.paused = false;

            this.flashId = this.flash.playSound(this.src, offset, loop, volume, pan);
			if (this.flashId == null) {
				if (this.onPlayFailed != null) { this.onPlayFailed(this); }
				this.cleanUp();
				return -1;
			}
			this.playState = SoundJS.PLAY_SUCCEEDED;
			this.owner.registerSoundInstance(this.flashId, this);
			return 1;
		}