function() {
          _this.confirmation.className = '';
          return setTimeout(function() {
            _this.confirmation.innerHTML = "If you think fontBomb is a blast, follow me on twitter <a href='http://www.twitter.com/plehoux'>@plehoux</a> for my next experiment!";
            _this.confirmation.className = 'show';
            return setTimeout(function() {
              return _this.confirmation.className = '';
            }, 20000);
          }, 5000);
        }