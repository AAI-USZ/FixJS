function(succeeded) {
      var moveTime, progress;
      clearTimeout(this.timeoutTimer);
      if (succeeded) {
        moveTime = this.moveTimer.end();
        this.start = new Date().getTime();
        this.console.info('success', this.level, 'reactionTime:', this.reactionTime, 'moveTime:', moveTime);
        this.currentLevel.push({
          value: 1,
          moveTime: moveTime,
          reactionTime: this.reactionTime
        });
        this.reactionTimeStat.add(this.reactionTime);
        this.moveTimeStat.add(moveTime);
      } else {
        this.currentLevel.push(0);
      }
      if (this.currentLevel.length >= this.options.clickCount) {
        this.evaluateCurrentLevel();
        if (this.currentLevel.score >= 0) {
          this.goodSize = this.size;
          this.console.info("goodSize is", this.goodSize, this);
          if (this.currentLevel.moveTimeAverage < 2000) {
            return this._newLevel(this.level + 2);
          } else {
            return this._newLevel(this.level + 1);
          }
        } else {
          return this.finish();
        }
      } else {
        progress = (this.currentLevel.length / this.options.clickCount) * 100;
        this.console.info('progress:', progress);
        this.progressBar.progressbar('value', Math.floor(progress));
        if (succeeded) {
          this.reactionTimer.clear();
          this.moveTimer.clear();
          return this._newPosition();
        }
      }
    }