function(_super) {

      __extends(CardListView, _super);

      function CardListView() {
        return CardListView.__super__.constructor.apply(this, arguments);
      }

      CardListView.prototype.initialize = function(card) {
        this.card = card;
        console.log('CardListView#initialize');
        this.setElement($('#templates').find(".card").clone());
        return this.render();
      };

      CardListView.prototype.events = {
        'touchstart': 'touchstart',
        'touchmove': 'touchmove',
        'swiperight': 'swiperight',
        'touchend': 'touchend',
        'touchcancel': 'touchend',
        'tap .discard': 'discard'
      };

      CardListView.prototype.render = function() {
        this.$el.find('.thumb').attr('src', "images/cards/" + (gsub(this.card.name, ' ', '_')) + "_thumb.png");
        this.$el.find('.name').html(this.card.name);
        this.$el.find('.name').addClass("name-" + this.card.type);
        this.$el.find('.desc').html(this.card.short_desc);
        this.$el.find('.card-notch').addClass(this.card.type);
        return $('#hand').prepend(this.el);
      };

      CardListView.prototype.w = 50;

      CardListView.prototype.touch = {
        x1: 0,
        y1: 0
      };

      CardListView.prototype.swiping = false;

      CardListView.prototype.dragging = false;

      CardListView.prototype.selected = false;

      CardListView.prototype.use = false;

      CardListView.prototype.clicked = false;

      CardListView.prototype.dx = 0;

      CardListView.prototype.dy = 0;

      CardListView.prototype.render_card = function() {
        console.log('CardListView#render_card');
        current.carddetailview.render(this.card);
        return changePage('#card-detail', {
          transition: 'flip'
        });
      };

      CardListView.prototype.touchstart = function(e) {
        var _this = this;
        this.clicked = true;
        setTimeout(function() {
          return _this.clicked = false;
        }, 250);
        this.touch.x1 = e.touches[0].pageX;
        return this.touch.y1 = e.touches[0].pageY;
      };

      CardListView.prototype.touchmove = function(e) {
        var pct;
        if (!window.globalDrag && e.touches.length === 1) {
          this.dx = e.touches[0].pageX - this.touch.x1;
          this.dy = e.touches[0].pageY - this.touch.y1;
          if (Math.abs(this.dy) < 6 && Math.abs(this.dx) > 0 && !this.swiping && !this.dragging) {
            this.swiping = true;
            window.inAction = true;
            this.$el.find('.card-main').addClass("drag");
            this.$el.find('.card-notch').addClass("drag");
          }
          if (this.swiping && this.dx > 0) {
            if (this.dx < this.w) {
              this.use = false;
              pct = this.dx / this.w;
              if (pct < 0.05) {
                pct = 0;
              }
              this.$el.find('.use').css("opacity", "" + pct);
            } else if (this.dx >= this.w) {
              this.use = true;
              this.dx = this.w + (this.dx - this.w) * .25;
              this.$el.find('.card-notch').css("-webkit-transform", "translate3d(" + (this.dx - this.w) + "px, 0, 0)");
            } else if (this.dx <= -this.w) {
              this.dx = -this.w + (this.dx + this.w) * .25;
            }
            if (this.dx >= this.w - 1) {
              this.$el.find('.card-main').addClass("green");
              this.used = true;
            } else {
              this.$el.find('.card-main').removeClass("green");
            }
            return this.$el.find('.card-main').css("-webkit-transform", "translate3d(" + this.dx + "px, 0, 0)");
          }
        }
      };

      CardListView.prototype.swiperight = function(e) {
        return console.log('swiping right');
      };

      CardListView.prototype.touchend = function(e) {
        var dy,
          _this = this;
        console.log("CardListView#touchend");
        console.log("dy: " + this.dy);
        console.log('touch end');
        if (e.touches.length === 0) {
          window.inAction = false;
          this.touch = {
            x1: 0,
            y1: 0
          };
          this.$el.find('.card-main').removeClass("drag").css("-webkit-transform", "translate3d(0,0,0)");
          this.$el.find('.card-notch').removeClass("green").css("-webkit-transform", "translate3d(0,0,0)");
          if (this.swiping) {
            this.swiping = false;
          }
        }
        if (this.use && this.dx >= this.w - 1) {
          this.dx = 0;
          if (current.deck.get('actions') > 0 && current.turn) {
            dy = ($('.card').size() - (this.$el.index() + 2)) * 58;
            setTimeout(function() {
              _this.$el.find('.card-main, .card-notch').css({
                'z-index': '999',
                'margin-bottom': '-51px',
                'opacity': '0',
                '-webkit-transition': 'all .25s ease-in-out !important',
                '-webkit-transform': "translate3d(0," + dy + "px,0)"
              });
              return setTimeout(function() {
                if (_this.card.type === 'action' || _this.card.type === 'attack') {
                  current.deck.set('actions', current.deck.get('actions') - 1);
                }
                _this.discard();
                _this.card.use();
                return current.match.set('last_move', new Date().toString().split(' ').slice(0, 5).join(' '));
              }, 250);
            }, 150);
            console.log(' - Using card');
          } else {
            if (!current.turn) {
              alert("It's not your turn!");
            } else {
              if (current.deck.get('actions') < 1) {
                alert("You have no actions left!");
              }
            }
          }
        } else {
          if (this.clicked && Math.abs(this.dy) < 6) {
            this.clicked = false;
            console.log('clicked');
            this.render_card();
          }
        }
        return this.dx = this.dy = 0;
      };

      CardListView.prototype.discard = function() {
        var nd, nh;
        this.remove();
        nh = _.clone(current.deck.get('hand'));
        nh = nh.minus(gsub(this.card.name, ' ', '_'));
        current.deck.set('hand', nh);
        nd = _.clone(current.deck.get('cards'));
        nd.push(gsub(this.card.name, ' ', '_'));
        return current.deck.set('cards', nd);
      };

      return CardListView;

    }