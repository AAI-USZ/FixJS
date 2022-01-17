function() {
				if (this.inDemo()) {
		  			this.inDemo(false);
					$.mobile.changePage($("#demoOver"), {transition: "slideup", changeHash: false});
				} else {
					var endTime = this.game.timer;
					endTime.pause();
					var leveledUp = false;
					var currentLevel = levels[this.difficulty];
					var goodEnough = currentLevel.goodEnoughForNextLevel(endTime, this.game.counter);
					if (goodEnough) {
						leveledUp = this.enableLevel(currentLevel.getNext());
					}
					$("#stats").text("You completed this puzzle in "+endTime.toString()+" with "+this.game.counter+" moves.");
					this.game.shutdown();
					var nextLevel = currentLevel.getNext();
					if (nextLevel) {
						$("#gameOver .level").text(nextLevel.name);
					}
					$("#gameOver .buttons").toggleClass("upLevel", goodEnough && nextLevel != null && nextLevel.isAvailable(this.premium));
					$("#gameOver .buttons").toggleClass("upgrade", goodEnough && nextLevel != null && !nextLevel.isAvailable(this.premium));
					if (leveledUp) {
						$("#quip").text("Congratulations, you've unlocked the "+currentLevel.getNext().name+" level!");
					} else if (goodEnough && nextLevel != null && !nextLevel.isAvailable(this.premium)) {
						$("#quip").text("Well done!  You've mastered the free version of PushPop.  Upgrade and try the 'Harder' and 'Insane' levels.");
					} else {
						$("#quip").text("\""+this.getComment(currentLevel, endTime, this.game.counter, goodEnough, this.levelsEnabled.indexOf(nextLevel.id) != -1)+"\"");
					}
					$.mobile.changePage($("#gameOver"), {transition: "slideup", changeHash: false});
				}
			}