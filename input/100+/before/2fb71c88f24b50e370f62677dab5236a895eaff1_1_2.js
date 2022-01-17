function Explosion() {
      this.tick = __bind(this.tick, this);
      this.dropBomb = __bind(this.dropBomb, this);
      var char, confirmation, style, _ref2,
        _this = this;
      if (window.FONTBOMB_LOADED) return;
      window.FONTBOMB_LOADED = true;
      if (!window.FONTBOMB_HIDE_CONFIRMATION) confirmation = true;
      this.bombs = [];
      this.body = document.getElementsByTagName("body")[0];
      if ((_ref2 = this.body) != null) {
        _ref2.onclick = function(event) {
          return _this.dropBomb(event);
        };
      }
      this.body.addEventListener("touchstart", function(event) {
        return _this.touchEvent = event;
      });
      this.body.addEventListener("touchmove", function(event) {
        _this.touchMoveCount || (_this.touchMoveCount = 0);
        return _this.touchMoveCount++;
      });
      this.body.addEventListener("touchend", function(event) {
        if (_this.touchMoveCount < 3) _this.dropBomb(_this.touchEvent);
        return _this.touchMoveCount = 0;
      });
      this.explosifyNodes(this.body.childNodes);
      this.chars = (function() {
        var _j, _len2, _ref3, _results;
        _ref3 = document.getElementsByTagName('particle');
        _results = [];
        for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
          char = _ref3[_j];
          _results.push(new Particle(char, this.body));
        }
        return _results;
      }).call(this);
      this.tick();
      if (confirmation != null) {
        style = document.createElement('style');
        style.innerHTML = "div#fontBombConfirmation {\n  position: absolute;\n  top: -200px;\n  left: 0px;\n  right: 0px;\n  bottom: none;\n  width: 100%;\n  padding: 18px;\n  margin: 0px;\n  background: #e8e8e8;\n  text-align: center;\n  font-size: 14px;\n  line-height: 14px;\n  font-family: verdana, sans-serif;\n  color: #000;\n  -webkit-transition: all 1s ease-in-out;\n  -moz-transition: all 1s ease-in-out;\n  -o-transition: all 1s ease-in-out;\n  -ms-transition: all 1s ease-in-out;\n  transition: all 1s ease-in-out;\n  -webkit-box-shadow: 0px 3px 3px rgba(0,0,0,0.20);\n  -moz-box-shadow: 0px 3px 3px rgba(0,0,0,0.20);\n  box-shadow: 0px 3px 3px rgba(0,0,0,0.20);\n  z-index: 100000002;\n}\ndiv#fontBombConfirmation span {\n  color: #fe3a1a;\n}\ndiv#fontBombConfirmation.show {\n  top:0px;\n  display:block;\n}";
        document.head.appendChild(style);
        this.confirmation = document.createElement("div");
        this.confirmation.id = 'fontBombConfirmation';
        this.confirmation.innerHTML = "<span style='font-weight:bold;'>fontBomb loaded!</span> Click anywhere to destroy " + (document.title.substring(0, 50));
        this.body.appendChild(this.confirmation);
        setTimeout(function() {
          return _this.confirmation.className = 'show';
        }, 10);
        setTimeout(function() {
          return _this.confirmation.className = '';
        }, 5000);
      }
    }