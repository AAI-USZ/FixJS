function() {
                this.jsNode.disconnect();
                this.running = false;
                // Reset to next note
                this.sequence = restoreSequence;
                this.elapsed = restoreElapsed;
                this.block.writeSample = 0;
                this.newNote = true;
                this.onComplete && this.onComplete();
            }