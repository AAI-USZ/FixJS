function(e) {
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
            if (views.carddetail) {
              views.carddetail.render(this.card);
            } else {
              views.carddetail = new CardDetailView;
              views.carddetail.render(this.card);
            }
            changePage('#card-detail', {
              transition: 'pop'
            });
          }
        }
        return this.dx = this.dy = 0;
      }