function() {
      this._fixConsole();
      this._savedCSS = {
        position: this.element.css('position'),
        top: this.element.css('top'),
        bottom: this.element.css('bottom'),
        left: this.element.css('left'),
        right: this.element.css('right'),
        'z-index': this.element.css('z-index'),
        'background-color': this.element.css('background-color')
      };
      this.element.css({
        position: 'absolute',
        top: '5px',
        bottom: '5px',
        left: '5px',
        right: '5px',
        'background-color': '#fff',
        'z-index': 100
      });
      this.element.addClass('wordmatch-container');
      this.element.append("<div class='progressBar'></div>");
      this.progressBar = this.element.find(".progressBar");
      this.progressBar.css({
        'float': 'right',
        'width': '50%'
      });
      this.progressBar.progressbar();
      this.element.append("<div class='play-area'>\n  <table>\n    <tr><td><div class='question-area'></div></td></tr>\n    <tr><td><div class='answer-area'></div></td></tr>\n  </table>\n</div>");
      this.playArea = this.element.find('.play-area');
      this.questionArea = this.element.find('.question-area');
      this.answerArea = this.element.find('.answer-area');
      this.questionArea.css({
        'text-align': 'center'
      });
      this.element.append("<div class='msg-dialog'></div>");
      this.messageArea = this.element.find('.msg-dialog');
      return this._beginGame();
    }