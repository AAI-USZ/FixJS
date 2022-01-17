function() {
    var CardDetailView, CardListView, ChooseOpponentsView, Deck, Decks, HomeView, LobbyView, LoginView, Match, MatchListView, MatchView, Matches, NewMatchUsernameView, NewMatchView, OpponentsListView, ShopListView, ShopView, SignupView, aOrAn, actions, cards, changePage, collections, current, gsub, match_channel, pushLog, pusher, user_channel, views;
    gsub = function(source, pattern, replacement) {
      var match, result;
      if (!((pattern != null) && (replacement != null))) {
        return source;
      }
      result = '';
      while (source.length > 0) {
        if ((match = source.match(pattern))) {
          result += source.slice(0, match.index);
          result += replacement;
          source = source.slice(match.index + match[0].length);
        } else {
          result += source;
          source = '';
        }
      }
      return result;
    };
    Array.prototype.minus = function(v) {
      var results, x, _i, _len;
      results = [];
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        x = this[_i];
        if (x !== v) {
          results.push(x);
        } else {
          v = '';
        }
      }
      return results;
    };
    Array.prototype.popper = function(e) {
      var popper, _ref;
      popper = this.slice(e, e + 1 || 9e9);
      [].splice.apply(this, [e, e - e + 1].concat(_ref = [])), _ref;
      return popper;
    };
    changePage = function(page, options) {
      var $curr, $page;
      $('.active').addClass('curr');
      $curr = $('.curr');
      $page = $(page);
      if (options != null) {
        if (options.reverse === true) {
          $curr.addClass('reverse');
          $page.addClass('reverse');
        }
        $curr.addClass("" + options.transition + " out");
        $page.addClass("" + options.transition + " in active");
        $curr.one('webkitAnimationEnd', function() {
          return $curr.removeClass("" + options.transition + " out active reverse curr");
        });
        return $page.one('webkitAnimationEnd', function() {
          return $page.removeClass("" + options.transition + " in reverse");
        });
      } else {
        $curr.removeClass('active reverse curr');
        $page.addClass('active');
        return $page.removeClass('reverse');
      }
    };
    aOrAn = function(word) {
      console.log(word.charAt(0));
      if (word.charAt(0) === 'a' || word.charAt(0) === 'e' || word.charAt(0) === 'i' || word.charAt(0) === 'o' || word.charAt(0) === 'u') {
        return "an";
      } else {
        return "a";
      }
    };
    pushLog = function(msg) {
      var log;
      log = _.clone(current.match.get('log'));
      log.push(msg);
      current.match.set('log', log);
      return console.log(current.match.get('log'));
    };
    user_channel = 0;
    match_channel = 0;
    pusher = new Pusher('8aabfcf0bad1b94dbac3');
    cards = {
      stone_pickaxe: {
        name: 'stone pickaxe',
        type: 'action',
        cost: 1,
        short_desc: 'Draw 1 card from the Mine',
        long_desc: 'long description',
        use: function() {
          return actions.draw(current.match, 'mine', {
            number: 1,
            random: false,
            callback: function(newcards) {
              console.log('calling callback');
              pushLog("<span class='name'>" + current.user.username + "</span> used a <span class='item action'>Stone Pickaxe</span> and got a <span class='item money'>" + newcards[0] + "</span>");
              current.match.save();
              current.deck.save();
              return current.deck.trigger('update_to_spend');
            }
          });
        }
      },
      iron_pickaxe: {
        name: 'iron pickaxe',
        type: 'action',
        cost: 3,
        short_desc: 'Draw 2 cards from the Mine',
        long_desc: 'long description',
        use: function() {
          return actions.draw(current.match, 'mine', {
            number: 2,
            random: false,
            callback: function(newcards) {
              console.log('calling callback');
              pushLog("<span class='name'>" + current.user.username + "</span> used an <span class='item action'>Iron Pickaxe</span> and got a <span class='item money'>" + newcards[0] + "</span> and <span class='item money'>" + newcards[1] + "</span>");
              current.match.save();
              current.deck.save();
              return current.deck.trigger('update_to_spend');
            }
          });
        }
      },
      diamond_pickaxe: {
        name: 'diamond pickaxe',
        type: 'action',
        cost: 6,
        short_desc: 'Draw 3 cards from the Mine',
        long_desc: 'long description',
        use: function() {
          return actions.draw(current.match, 'mine', {
            number: 3,
            random: false,
            callback: function(newcards) {
              console.log('calling callback');
              pushLog("<span class='name'>" + current.user.username + "</span> used a <span class='item action'>Diamond Pickaxe</span> and got a <span class='item money'>" + newcards[0] + "</span>, <span class='item money'>" + newcards[1] + "</span> and <span class='item money'>" + newcards[2] + "</span>");
              current.match.save();
              current.deck.save();
              return current.deck.trigger('update_to_spend');
            }
          });
        }
      },
      copper: {
        name: 'copper',
        type: 'money',
        value: 1,
        short_desc: 'Worth $1 at the Shop',
        long_desc: 'long description',
        use: function() {
          console.log('copper used');
          return actions.discard({
            number: 2
          });
        }
      },
      silver: {
        name: 'silver',
        type: 'money',
        value: 2,
        short_desc: 'Worth $2 at the Shop',
        long_desc: 'long description',
        use: function() {
          console.log('copper used');
          return actions.discard({
            number: 2
          });
        }
      },
      gold: {
        name: 'gold',
        type: 'money',
        value: 3,
        short_desc: 'Worth $3 at the Shop',
        long_desc: 'long description',
        use: function() {
          console.log('copper used');
          return actions.discard({
            number: 2
          });
        }
      },
      diamond: {
        name: 'diamond',
        type: 'money',
        value: 5,
        short_desc: 'Worth $5 at the Shop',
        long_desc: 'long description',
        use: function() {
          console.log('copper used');
          return actions.discard({
            number: 2
          });
        }
      },
      coal: {
        name: 'coal',
        type: 'coal',
        value: 0,
        short_desc: 'Worthless',
        long_desc: 'long description',
        use: function() {
          console.log('copper used');
          return actions.discard({
            number: 2
          });
        }
      },
      tnt: {
        name: 'tnt',
        type: '',
        cost: 5,
        short_desc: "Destroy 2 items from an opponent's hand",
        long_desc: 'long description',
        use: function() {
          console.log("tnt#use");
          current.attack = function(player) {
            var opponents_decks;
            console.log("current#attack");
            console.log("chosen opponent:");
            console.log(player);
            opponents_decks = new Decks();
            opponents_decks.url = "" + server_url + "/decks_by_user/" + player.id;
            console.log("fetching decks");
            opponents_decks.fetch({
              success: function() {
                var card, reaction, target_deck, _i, _len, _ref;
                console.log('fetch success');
                target_deck = new Deck;
                console.log("opponents deck:");
                console.log(opponents_decks.where({
                  match_id: current.match.get('id')
                })[0]);
                target_deck.set(opponents_decks.where({
                  match_id: current.match.get('id')
                })[0]);
                reaction = false;
                _ref = target_deck.get('hand');
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  card = _ref[_i];
                  if (cards[card].type === 'reaction') {
                    reaction = true;
                    break;
                  }
                }
                if (reaction === false) {
                  return actions.trash(target_deck, 'hand', {
                    random: true,
                    number: 2,
                    callback: function(newcards) {
                      console.log('calling callback');
                      pushLog("<span class='name'>" + current.user.username + "</span> used a <span class='item attack'>TNT</span> on <span class='name'>" + player.username + "</span> and trashed a <span class='item " + cards[newcards[0]].type + "'>" + cards[newcards[0]].name + "</span> and <span class='item " + cards[newcards[1]].type + "'>" + cards[newcards[1]].name + "</span>");
                      current.match.save();
                      current.deck.save();
                      target_deck.save();
                      return current.deck.trigger('update_to_spend');
                    }
                  });
                } else {
                  alert("" + player.username + " used a reaction card and blocked your attack!");
                  return pushLog("<span class='name'>" + player.username + "</span> blocked <span class='name'>" + current.user.username + "'s</span> <span class='item attack'>TNT</span> with a <span class='item'>Shield</span>.");
                }
              }
            });
            if (current.match.get('players').length > 2) {
              return changePage('#match', {
                transition: 'slide'
              });
            }
          };
          if (current.match.get('players').length > 2) {
            current.opponentsview = new ChooseOpponentsView();
            return changePage('#choose-opponents', {
              transition: 'slideup'
            });
          } else {
            return current.attack(_.find(current.match.get('players'), function(player) {
              return player.id !== current.user.id;
            }));
          }
        }
      },
      minecart: {
        name: 'minecart',
        type: 'action',
        cost: 5,
        short_desc: '+2 Action, +1 Card',
        long_desc: 'long description',
        use: function() {
          current.deck.set('actions', current.deck.get('actions') + 2);
          return actions.draw(current.deck, 'cards', {
            number: 1,
            random: false,
            callback: function(newcards) {
              console.log('calling callback');
              pushLog("<span class='name'>" + current.user.username + "</span> used a <span class='item action'>Minecart</span> and got a <span class='item " + cards[newcards[0]].type + "'>" + cards[newcards[0]].name + "</span>");
              current.match.save();
              current.deck.save();
              return current.deck.trigger('update_to_spend');
            }
          });
        }
      },
      mule: {
        name: 'mule',
        type: 'action',
        cost: 4,
        short_desc: '+3 Cards',
        long_desc: 'long description',
        use: function() {
          return actions.draw(current.deck, 'cards', {
            number: 3,
            random: false,
            callback: function(newcards) {
              console.log('calling callback');
              pushLog("<span class='name'>" + current.user.username + "</span> used a <span class='item action'>Minecart</span> and got a <span class='item " + cards[newcards[0]].type + "'>" + cards[newcards[0]].name + "</span>, <span class='item " + cards[newcards[1]].type + "'>" + newcards[1] + "</span> and <span class='item " + cards[newcards[2]].type + "'>" + newcards[2] + "</span>");
              current.match.save();
              current.deck.save();
              return current.deck.trigger('update_to_spend');
            }
          });
        }
      },
      headlamp: {
        name: 'headlamp',
        type: 'action',
        cost: 99,
        short_desc: 'Draw two additional cards next hand.',
        long_desc: 'long description'
      },
      gopher: {
        name: 'gopher',
        type: 'attack',
        cost: 5,
        short_desc: "Steals a random card from an Opponent's hand",
        long_desc: 'long description',
        use: function() {
          console.log("gopher#use");
          current.attack = function(player) {
            var opponents_decks;
            console.log("current#attack");
            console.log("chosen opponent:");
            console.log(player);
            opponents_decks = new Decks();
            opponents_decks.url = "" + server_url + "/decks_by_user/" + player.id;
            console.log("fetching decks");
            opponents_decks.fetch({
              success: function() {
                var target_deck;
                console.log('fetch success');
                target_deck = new Deck;
                console.log("opponents deck:");
                console.log(opponents_decks.where({
                  match_id: current.match.get('id')
                })[0]);
                target_deck.set(opponents_decks.where({
                  match_id: current.match.get('id')
                })[0]);
                return actions.draw(target_deck, 'hand', {
                  random: true,
                  number: 1,
                  callback: function(newcards) {
                    console.log('calling callback');
                    pushLog("<span class='name'>" + current.user.username + "</span> used a <span class='item action'>Gopher</span> on <span class='name'>" + player.username + "</span> and got a <span class='item " + cards[newcards[0]].type + "'>" + cards[newcards[0]].name + "</span>");
                    current.match.save();
                    current.deck.save();
                    target_deck.save();
                    return current.deck.trigger('update_to_spend');
                  }
                });
              }
            });
            if (current.match.get('players').length > 2) {
              return changePage('#match', {
                transition: 'slide'
              });
            }
          };
          if (current.match.get('players').length > 2) {
            current.opponentsview = new ChooseOpponentsView();
            return changePage('#choose-opponents', {
              transition: 'slideup'
            });
          } else {
            return current.attack(_.find(current.match.get('players'), function(player) {
              return player.id !== current.user.id;
            }));
          }
        }
      },
      magnet: {
        name: 'magnet',
        type: 'action',
        cost: 99,
        short_desc: 'Steal a tresure card from an Opponent',
        long_desc: 'long description'
      },
      alchemy: {
        name: 'alchemy',
        type: 'action',
        cost: 4,
        short_desc: 'Turns 2 coals into a Diamond',
        long_desc: 'long description',
        use: function() {
          var coals, new_hand, source;
          source = _.clone(current.deck.get('hand'));
          coals = _.filter(source, function(card) {
            return card === 'coal';
          });
          source = _.reject(source, function(card) {
            return card === 'coal';
          });
          if (coals.length >= 2) {
            source.push('diamond');
            current.deck.set('hand', source);
            pushLog("<span class='name'>" + current.user.username + "</span> used <span class='item action'>Alchemy</span> and got a <span class='money'>Diamond</span>");
            current.match.save();
            return current.deck.save();
          } else {
            current.deck.set('actions', current.deck.get('actions') + 1);
            new_hand = _.clone(current.deck.get('hand'));
            new_hand.push('alchemy');
            current.deck.set('hand', new_hand);
            return alert('You need at least two coals in hand to make use this card!');
          }
        }
      },
      shield: {
        name: 'shield',
        type: 'reaction',
        cost: 3,
        short_desc: 'Blocks an incoming attack',
        long_desc: "Prevents a single attack from affecting you. This card is then returned to your inventory after it's been used."
      }
    };
    actions = {
      draw: function(model, attribute, options) {
        var hand, i, newcard, newcards, r, source, _i, _ref, _ref1, _ref2;
        console.log("actions#draw");
        if (typeof options.number === 'undefined') {
          optoins.number = 1;
        }
        if (typeof options.number === 'undefined') {
          optoins.random = false;
        }
        newcards = [];
        console.log(" - Iterating..");
        source = _.clone(model.get(attribute));
        hand = _.clone(current.deck.get('hand'));
        for (i = _i = 1, _ref = options.number; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          console.log(" - Check for options.random");
          if (options.random === true) {
            console.log(" - - random: true");
            r = Math.floor(Math.floor(Math.random() * (source.length - 1)));
            newcard = source[r];
            [].splice.apply(source, [r, r - r + 1].concat(_ref1 = [])), _ref1;
          } else {
            console.log(" - - random: false");
            newcard = source[0];
            [].splice.apply(source, [0, 1].concat(_ref2 = [])), _ref2;
          }
          console.log(" - newcard: " + newcard);
          console.log(" - Pushing new card");
          hand.push(newcard);
          newcards.push(newcard);
        }
        model.set(attribute, source);
        current.deck.set('hand', hand);
        console.log(" - Firing callback");
        if (typeof options.callback === 'function') {
          return options.callback(newcards);
        }
      },
      discard: function(options, cb) {
        $('.discard').show();
        console.log(options.number);
        return current.deck.set({
          amount_to_discard: options.number,
          amount_discarded: 0,
          discard_type: options.type
        });
      },
      trash: function(model, attribute, options) {
        var i, newcard, newcards, r, source, _i, _ref, _ref1, _ref2;
        console.log("actions#trash");
        if (typeof options.number === 'undefined') {
          optoins.number = 1;
        }
        if (typeof options.number === 'undefined') {
          optoins.random = false;
        }
        newcards = [];
        console.log(" - Iterating..");
        source = _.clone(model.get(attribute));
        for (i = _i = 1, _ref = options.number; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          console.log(" - Check for options.random");
          if (options.random === true) {
            console.log(" - - random: true");
            r = Math.floor(Math.floor(Math.random() * (source.length - 1)));
            newcard = source[r];
            [].splice.apply(source, [r, r - r + 1].concat(_ref1 = [])), _ref1;
          } else {
            console.log(" - - random: false");
            newcard = source[0];
            [].splice.apply(source, [0, 1].concat(_ref2 = [])), _ref2;
          }
          console.log(" - newcard: " + newcard);
          console.log(" - Pushing new card");
          newcards.push(newcard);
          console.log(" - Setting model: " + attribute);
          model.set(attribute, source);
        }
        console.log(" - Firing callback");
        if (typeof options.callback === 'function') {
          return options.callback(newcards);
        }
      }
    };
    current = {
      lobby: 0,
      match: 0,
      deck: 0,
      hand: [],
      turn: false,
      user: 0,
      to_spend: 0,
      before_turn: function() {}
    };
    collections = {};
    views = {};
    Match = (function(_super) {

      __extends(Match, _super);

      function Match() {
        return Match.__super__.constructor.apply(this, arguments);
      }

      Match.prototype.initialize = function() {
        var _this = this;
        console.log("initializing Match model");
        return this.on('change', function() {
          return console.log("match changed");
        });
      };

      return Match;

    })(Backbone.Model);
    Matches = (function(_super) {

      __extends(Matches, _super);

      function Matches() {
        return Matches.__super__.constructor.apply(this, arguments);
      }

      Matches.prototype.initialize = function() {
        return console.log('initializing Matches collection');
      };

      Matches.prototype.model = Match;

      Matches.prototype.url = "" + server_url + "/matches";

      return Matches;

    })(Backbone.Collection);
    Deck = (function(_super) {

      __extends(Deck, _super);

      function Deck() {
        return Deck.__super__.constructor.apply(this, arguments);
      }

      Deck.prototype.initialize = function() {
        var _this = this;
        return this.on('change', function() {
          return console.log("deck changed");
        });
      };

      Deck.prototype.urlRoot = "" + server_url + "/decks";

      Deck.prototype.amount_to_discard = 0;

      Deck.prototype.amount_discarded = 0;

      Deck.prototype.type = 0;

      Deck.prototype.to_spend = function() {
        var card, to_spend, _i, _len, _ref;
        console.log("Deck#to_spend");
        to_spend = 0;
        _ref = this.get('hand');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          card = _ref[_i];
          if (cards[card].type === 'money') {
            to_spend += cards[card].value;
          }
        }
        return to_spend;
      };

      Deck.prototype.total_points = function() {
        var card, total_points, _i, _len, _ref;
        total_points = 0;
        _ref = this.get('cards');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          card = _ref[_i];
          if (cards[card].type === 'money') {
            total_points += cards[card].value;
          }
        }
        return total_points + this.to_spend();
      };

      Deck.prototype.spend = function(value) {
        var card, money_cards, new_hand, _i, _j, _len, _len1, _ref;
        console.log('Deck#spend');
        money_cards = [];
        _ref = this.get('hand');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          card = _ref[_i];
          if (cards[card].type === 'money') {
            money_cards.push(card);
          }
        }
        money_cards = _.sortBy(money_cards, function(i) {
          return i;
        });
        console.log("current money cards in hand: " + money_cards);
        new_hand = this.get('hand');
        for (_j = 0, _len1 = money_cards.length; _j < _len1; _j++) {
          card = money_cards[_j];
          if (value > 0) {
            new_hand = new_hand.minus(card);
            console.log(new_hand);
            value = value - cards[card].value;
            console.log(value);
          }
        }
        if (value < 0) {
          switch (value) {
            case -1:
              console.log("returning copper as change");
              new_hand.push('copper');
              break;
            case -2:
              console.log("returning silver as change");
              new_hand.push('silver');
              break;
            case -3:
              console.log("returning gold as change");
              new_hand.push('gold');
              break;
            case -4:
              console.log("returning two silvers as change");
              new_hand.push('silver');
              new_hand.push('silver');
          }
        }
        console.log("new hand: " + new_hand);
        this.set('hand', new_hand);
        console.log("saving hand..");
        return this.save;
      };

      return Deck;

    })(Backbone.Model);
    Decks = (function(_super) {

      __extends(Decks, _super);

      function Decks() {
        return Decks.__super__.constructor.apply(this, arguments);
      }

      Decks.prototype.initialize = function() {
        return console.log("initializing Decks collection");
      };

      Decks.prototype.model = Deck;

      Decks.prototype.url = "" + server_url + "/decks";

      return Decks;

    })(Backbone.Collection);
    OpponentsListView = (function(_super) {

      __extends(OpponentsListView, _super);

      function OpponentsListView() {
        return OpponentsListView.__super__.constructor.apply(this, arguments);
      }

      OpponentsListView.prototype.initialize = function(player) {
        this.player = player;
        console.log("initializing opponentslistview");
        this.setElement($('#templates').find(".opponent-item").clone());
        return this.render();
      };

      OpponentsListView.prototype.events = {
        'click': 'select'
      };

      OpponentsListView.prototype.render = function() {
        console.log('OpponentsListView#render');
        $('#opponents').append(this.el);
        return this.$el.html(this.player.username);
      };

      OpponentsListView.prototype.select = function() {
        console.log("opponentlistview#select");
        return current.attack(this.player);
      };

      return OpponentsListView;

    })(Backbone.View);
    ChooseOpponentsView = (function(_super) {

      __extends(ChooseOpponentsView, _super);

      function ChooseOpponentsView() {
        return ChooseOpponentsView.__super__.constructor.apply(this, arguments);
      }

      ChooseOpponentsView.prototype.initialize = function() {
        console.log("initializing ChooseOpponentsView");
        return this.render();
      };

      ChooseOpponentsView.prototype.el = '#choose-opponent';

      ChooseOpponentsView.prototype.render = function() {
        var player, view, _i, _len, _ref, _results;
        _ref = current.match.get('players');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          player = _ref[_i];
          console.log("opponent: " + player.username);
          if (player.id !== current.user.id) {
            _results.push(view = new OpponentsListView(player));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return ChooseOpponentsView;

    })(Backbone.View);
    ShopListView = (function(_super) {

      __extends(ShopListView, _super);

      function ShopListView() {
        return ShopListView.__super__.constructor.apply(this, arguments);
      }

      ShopListView.prototype.initialize = function(card, amount) {
        this.card = card;
        this.amount = amount;
        console.log('initializing ShopListView');
        this.setElement($('#templates').find(".shop-item").clone());
        return this.render();
      };

      ShopListView.prototype.events = {
        'click': 'buy'
      };

      ShopListView.prototype.render = function() {
        console.log('ShopListView#render');
        console.log(this.card);
        $('#shop').find('#shopContainer').append(this.el);
        this.$el.find('.count').html(this.amount);
        this.$el.find('.price').html(this.card.cost);
        return this.$el.find('img').attr('src', "images/cards/" + (gsub(this.card.name, ' ', '_')) + "_thumb.png");
      };

      ShopListView.prototype.buy = function() {
        var curr_cards, shop;
        console.log("ShopListView#buy");
        if (this.card.cost <= current.deck.to_spend()) {
          if (current.turn) {
            shop = _.clone(current.match.get('shop'));
            shop = shop.minus(gsub(this.card.name, ' ', '_'));
            current.match.set('shop', shop);
            curr_cards = _.clone(current.deck.get('cards'));
            curr_cards.push(gsub(this.card.name, ' ', '_'));
            current.deck.set('cards', curr_cards);
            this.amount--;
            this.$el.find('.count').html(this.amount);
            current.deck.spend(this.card.cost);
            pushLog("<span class='name'>" + current.user.username + "</span> bought " + (aOrAn(this.card.name)) + " <span class='item action'>" + this.card.name + "</span>");
            changePage('#match', {
              transition: 'slide'
            });
            current.match.save();
            current.deck.save();
            return current.deck.trigger('update_to_spend');
          } else {
            return alert("It's not your turn!");
          }
        } else {
          console.log('not enough money');
          return alert("not enough money!");
        }
      };

      return ShopListView;

    })(Backbone.View);
    ShopView = (function(_super) {

      __extends(ShopView, _super);

      function ShopView() {
        return ShopView.__super__.constructor.apply(this, arguments);
      }

      ShopView.prototype.initialize = function(card) {
        var _this = this;
        this.card = card;
        console.log('init ShopView');
        current.match.on('change:shop', function() {
          return _this.render();
        });
        return this.render();
      };

      ShopView.prototype.el = '#shop';

      ShopView.prototype.events = {
        'tap .back': 'back'
      };

      ShopView.prototype.render = function() {
        var amount, card, prev, shop, view, _i, _len, _ref, _results;
        console.log('ShopView#render');
        shop = {};
        prev = '';
        console.log(current.match.get('shop'));
        _ref = current.match.get('shop');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          card = _ref[_i];
          if (card !== prev) {
            shop[card] = 1;
          } else {
            shop[card] = shop[card] + 1;
          }
          prev = card;
        }
        this.$el.find('#shopContainer').html('');
        _results = [];
        for (card in shop) {
          amount = shop[card];
          console.log(cards[card]);
          _results.push(view = new ShopListView(cards[card], amount));
        }
        return _results;
      };

      ShopView.prototype.back = function() {
        return changePage("#match", {
          transition: 'slide',
          reverse: true
        });
      };

      return ShopView;

    })(Backbone.View);
    CardDetailView = (function(_super) {

      __extends(CardDetailView, _super);

      function CardDetailView() {
        return CardDetailView.__super__.constructor.apply(this, arguments);
      }

      CardDetailView.prototype.initialize = function() {};

      CardDetailView.prototype.el = '#card-detail';

      CardDetailView.prototype.events = {
        'tap .close': 'close'
      };

      CardDetailView.prototype.render = function(card) {
        this.$el.find('#card-detail-name').html(card.name);
        return this.$el.find('#card-detail-desc').html(card.long_desc);
      };

      CardDetailView.prototype.close = function() {
        return changePage('#match', {
          transition: 'pop',
          reverse: true
        });
      };

      return CardDetailView;

    })(Backbone.View);
    CardListView = (function(_super) {

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
        views.carddetail.render(this.card);
        return changePage('#card-detail', {
          transition: 'pop'
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

    })(Backbone.View);
    MatchView = (function(_super) {

      __extends(MatchView, _super);

      function MatchView() {
        return MatchView.__super__.constructor.apply(this, arguments);
      }

      MatchView.prototype.initialize = function() {
        var deck_channel,
          _this = this;
        console.log('MatchView#initialize');
        console.log(" - instantiating CardDetailView");
        match_channel = pusher.channel("" + (current.match.get('id')));
        deck_channel = pusher.subscribe("" + (current.match.get('id')));
        current.match.on('change:log', function() {
          console.log("current.match change:log");
          return _this.$el.find('#log').html(_.last(current.match.get('log')));
        });
        current.match.on('change:mine', function() {
          console.log("current.match change:mine");
          return _this.$el.find('#mine > .count').html(current.match.get('mine').length);
        });
        current.match.on('change:turn', function() {
          var player;
          current.turn = current.match.get('turn') === current.user.id ? true : false;
          if (current.turn) {
            _this.$el.find('#end_turn').show();
            return _this.$el.find('#turn').hide();
          } else {
            _this.$el.find('#end_turn').hide();
            _this.$el.find('#turn').show();
            player = _.find(current.match.get('players'), function(player) {
              return player.id === current.match.get('turn');
            });
            return _this.$el.find('#turn > .count').html(player.username);
          }
        });
        current.deck.on('change:hand', function() {
          var card, view, _i, _len, _ref, _results;
          _this.$el.find('.card').remove();
          _ref = current.deck.get('hand');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            card = _ref[_i];
            _results.push(view = new CardListView(cards[card]));
          }
          return _results;
        });
        current.deck.on('change:actions', function() {
          console.log("current.deck change:actions");
          return _this.$el.find('#actions > .count').html(current.deck.get('actions'));
        });
        current.deck.on('update_to_spend', function() {
          console.log("event: update_to_spend");
          return _this.$el.find('#to_spend > .count').html(current.deck.to_spend());
        });
        return this.render();
      };

      MatchView.prototype.el = '#match';

      MatchView.prototype.events = {
        'tap #end_turn': 'end_turn',
        'tap #lobby_header': 'back_to_lobby',
        'tap #shop_link': 'render_shop'
      };

      MatchView.prototype.render = function() {
        var $player, $players_bar, card, player, players_decks, view, _i, _j, _len, _len1, _ref, _ref1, _results;
        current.turn = current.match.get('turn') === current.user.id ? true : false;
        this.$el.find('#log').html(_.last(current.match.get('log')));
        this.$el.find('#actions > .count').html(current.deck.get('actions'));
        this.$el.find('#mine > .count').html(current.match.get('mine').length);
        this.$el.find('#to_spend > .count').html(current.deck.to_spend());
        this.$el.find('.card').remove();
        _ref = current.deck.get('hand');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          card = _ref[_i];
          view = new CardListView(cards[card]);
        }
        if (current.turn) {
          this.$el.find('#end_turn').show();
          this.$el.find('#turn').hide();
        } else {
          this.$el.find('#end_turn').hide();
          this.$el.find('#turn').show();
          player = _.find(current.match.get('players'), function(player) {
            return player.id === current.match.get('turn');
          });
          this.$el.find('#turn > .count').html(player.username);
        }
        $players_bar = $(".two.players");
        switch (current.match.get('players').length) {
          case 3:
            $players_bar = $(".three.players");
            break;
          case 4:
            $players_bar = $(".four.players");
        }
        $players_bar.show().html('');
        _ref1 = current.match.get('players');
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          player = _ref1[_j];
          $player = $('#templates').find(".player").clone();
          $player.find('.name').html(player.username);
          if (current.match.get('turn') === player.id) {
            $player.addClass('turn');
          }
          if (player.id === current.user.id) {
            $player.find('.score').html(current.deck.get('points'));
          } else {
            players_decks = new Decks();
            players_decks.url = "" + server_url + "/decks_by_user/" + player.id;
            players_decks.fetch({
              success: function() {
                var deck;
                deck = players_decks.where({
                  match_id: current.match.get('id')
                })[0];
                return $player.find('.score').html(deck.get('points'));
              }
            });
          }
          _results.push($players_bar.append($player));
        }
        return _results;
      };

      MatchView.prototype.end_turn = function() {
        var _this = this;
        console.log('MatchView#end_turn');
        $('#loader').show();
        $('#loader').css('opacity', 1);
        $('#loader').find('#loading-text').html('Submitting turn...');
        current.match.set('last_move', new Date().toString().split(' ').slice(0, 5).join(' '));
        return $.post("" + server_url + "/end_turn/" + (current.match.get('id')), {
          'match': current.match.toJSON()
        }, function(data) {
          current.match.set(JSON.parse(data)["match"]);
          current.deck.set(JSON.parse(data)["deck"]);
          return $('#loader').hide();
        });
      };

      MatchView.prototype.back_to_lobby = function() {
        return changePage("#lobby", {
          transition: 'slide'
        });
      };

      MatchView.prototype.render_shop = function() {
        if (views.shop) {
          views.shop.render();
        } else {
          views.shop = new ShopView;
        }
        return changePage("#shop", {
          transition: 'slide',
          reverse: true
        });
      };

      return MatchView;

    })(Backbone.View);
    NewMatchUsernameView = (function(_super) {

      __extends(NewMatchUsernameView, _super);

      function NewMatchUsernameView() {
        return NewMatchUsernameView.__super__.constructor.apply(this, arguments);
      }

      NewMatchUsernameView.prototype.initialize = function() {};

      NewMatchUsernameView.prototype.el = '#new_match_username';

      NewMatchUsernameView.prototype.events = {
        'tap .back': 'back'
      };

      NewMatchUsernameView.prototype.back = function() {
        console.log('click');
        return changePage("#new_match", {
          transition: 'slide',
          reverse: true
        });
      };

      return NewMatchUsernameView;

    })(Backbone.View);
    NewMatchView = (function(_super) {

      __extends(NewMatchView, _super);

      function NewMatchView() {
        return NewMatchView.__super__.constructor.apply(this, arguments);
      }

      NewMatchView.prototype.initialize = function() {};

      NewMatchView.prototype.el = '#new_match';

      NewMatchView.prototype.events = {
        'tap .back': 'back',
        'tap .username': 'username'
      };

      NewMatchView.prototype.back = function() {
        return changePage("#lobby", {
          transition: 'slideup',
          reverse: true
        });
      };

      NewMatchView.prototype.username = function() {
        return changePage("#new_match_username", {
          transition: 'slide'
        });
      };

      return NewMatchView;

    })(Backbone.View);
    MatchListView = (function(_super) {

      __extends(MatchListView, _super);

      function MatchListView() {
        return MatchListView.__super__.constructor.apply(this, arguments);
      }

      MatchListView.prototype.initialize = function(match, deck) {
        var sub,
          _this = this;
        this.match = match;
        this.deck = deck;
        console.log('init MatchListView');
        this.setElement($('#templates').find(".match-item-view").clone());
        sub = pusher.subscribe("" + (this.match.get('id')));
        sub.bind('change_turn', function(data) {
          return _this.match.fetch({
            success: function() {
              return _this.deck.fetch({
                success: function() {
                  return _this.render();
                }
              });
            }
          });
        });
        sub.bind('update', function(data) {
          return _this.match.fetch({
            success: function() {
              return _this.deck.fetch({
                success: function() {
                  return _this.render();
                }
              });
            }
          });
        });
        return this.render();
      };

      MatchListView.prototype.events = {
        'tap': 'render_match'
      };

      MatchListView.prototype.render = function() {
        var player, players;
        console.log('MatchListView#render');
        if (this.match.get('turn') === current.user.id) {
          $('#matches').find('#your-turn').prepend(this.el);
        } else {
          $('#matches').find('#their-turn').prepend(this.el);
        }
        players = this.match.get('players').filter(function(player) {
          return player.id !== current.user.id;
        });
        this.$el.find('.head').html("Mining with " + ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = players.length; _i < _len; _i++) {
            player = players[_i];
            _results.push(player.username);
          }
          return _results;
        })()));
        console.log('checking last move');
        if (("" + (this.match.get('last_move'))) === "null") {
          return this.$el.find('.subhead').html("No moves yet!");
        } else {
          return this.$el.find('.subhead').html("Last move " + ($.timeago(this.match.get('last_move'))) + "<br/>" + (_.last(this.match.get('log'))));
        }
      };

      MatchListView.prototype.render_match = function() {
        console.log('MatchListView#render_match');
        current.match = this.match;
        current.deck = this.deck;
        console.log("checking if MatchView instance exists.");
        if (views.match) {
          views.match.render();
        } else {
          console.log('MatchView instance doesnt exist. Creating new matchview');
          views.match = new MatchView;
        }
        return changePage('#match', {
          transition: 'slide'
        });
      };

      return MatchListView;

    })(Backbone.View);
    LobbyView = (function(_super) {

      __extends(LobbyView, _super);

      function LobbyView() {
        return LobbyView.__super__.constructor.apply(this, arguments);
      }

      LobbyView.prototype.initialize = function() {
        var _this = this;
        console.log('init LobbyView');
        views.newmatchview = new NewMatchView;
        user_channel.bind('new_match', function(match) {
          collections.matches.add(match);
          return collections.decks.fetch({
            success: function() {
              alert("You've been challenged to a new game!");
              return _this.render();
            }
          });
        });
        return this.render();
      };

      LobbyView.prototype.el = '#lobby';

      LobbyView.prototype.events = {
        'tap #refresh_lobby': 'render',
        'tap #create_match': 'create_match',
        'tap .logout': 'logout'
      };

      LobbyView.prototype.render = function() {
        this.$el.find('.match-item-view').remove();
        $('#loader').hide();
        return collections.matches.each(function(match) {
          var deck, view;
          console.log('iterating matches in LobbyView#render');
          deck = collections.decks.find(function(deck) {
            return deck.get('match_id') === match.get('id');
          });
          return view = new MatchListView(match, deck);
        });
      };

      LobbyView.prototype.logout = function() {
        console.log("LobbyView#logout");
        $.cookie('token', null);
        pusher.unsubscribe("" + current.user.id);
        return changePage("#home");
      };

      LobbyView.prototype.create_match = function() {
        return changePage("#new_match", {
          transition: 'slideup'
        });
      };

      return LobbyView;

    })(Backbone.View);
    LoginView = (function(_super) {

      __extends(LoginView, _super);

      function LoginView() {
        return LoginView.__super__.constructor.apply(this, arguments);
      }

      LoginView.prototype.initialize = function() {};

      LoginView.prototype.el = '#login';

      LoginView.prototype.events = {
        'submit #login-form': 'login',
        'tap #facebook-auth': 'facebook_auth',
        'tap .back': 'back'
      };

      LoginView.prototype.facebook_auth = function(e) {
        var _this = this;
        console.log('facebook_auth function');
        window.plugins.childBrowser.showWebPage("" + server_url + "/auth/facebook?display=touch");
        return window.plugins.childBrowser.onLocationChange = function(loc) {
          var access_token;
          if (/access_token/.test(loc)) {
            access_token = unescape(loc).split("access_token/")[1];
            $.cookie("token", access_token, {
              expires: 7300
            });
            window.plugins.childBrowser.close();
            return views.home.set_user();
          }
        };
      };

      LoginView.prototype.login = function(e) {
        $('#loader').show();
        $.post("" + server_url + "/signin.json", $('#login-form').serialize(), function(user) {
          if (user.error != null) {
            alert('invalid username and/or password');
            $('#loader').hide();
            return $('#loader').css('opacity', 0);
          } else {
            $('#loader').hide();
            $('#loader').css('opacity', 0);
            $.cookie('token', user.token, {
              expires: 7300
            });
            console.log($.cookie('token'));
            current.user = user;
            user_channel = pusher.subscribe("" + current.user.id);
            return views.home.set_user();
          }
        }, 'json');
        return e.preventDefault();
      };

      LoginView.prototype.back = function() {
        return changePage("#home", {
          transition: 'slideup',
          reverse: true
        });
      };

      return LoginView;

    })(Backbone.View);
    SignupView = (function(_super) {

      __extends(SignupView, _super);

      function SignupView() {
        return SignupView.__super__.constructor.apply(this, arguments);
      }

      SignupView.prototype.initialize = function() {};

      SignupView.prototype.el = '#signup';

      SignupView.prototype.events = {
        'submit #signup-form': 'signup',
        'tap .back': 'back'
      };

      SignupView.prototype.signup = function(e) {
        $.post("" + server_url + "/users.json", $('#signup-form').serialize(), function(user) {
          if (user.error != null) {
            return alert('error');
          } else {
            console.log($.cookie('token', {
              expires: 7300
            }));
            return views.home.set_user();
          }
        }, 'json');
        return e.preventDefault();
      };

      SignupView.prototype.back = function() {
        return changePage("#home", {
          transition: 'slideup',
          reverse: true
        });
      };

      return SignupView;

    })(Backbone.View);
    HomeView = (function(_super) {

      __extends(HomeView, _super);

      function HomeView() {
        return HomeView.__super__.constructor.apply(this, arguments);
      }

      HomeView.prototype.initialize = function() {
        collections.matches = new Matches;
        collections.decks = new Decks;
        if ($.cookie("token") != null) {
          console.log('cookie found');
          console.log($.cookie('token'));
          $('#loader').show();
          $('#loader').find('#loading-text').html('Logging in...');
          return this.set_user();
        } else {
          return console.log('cookie not found');
        }
      };

      HomeView.prototype.el = '#home';

      HomeView.prototype.events = {
        'tap #login-button': 'login',
        'tap #signup-button': 'signup'
      };

      HomeView.prototype.login = function() {
        if (!views.login) {
          views.login = new LoginView;
        }
        return changePage("#login", {
          transition: "slideup"
        });
      };

      HomeView.prototype.signup = function() {
        if (!views.signup) {
          views.signup = new SignupView;
        }
        return changePage("#signup", {
          transition: "slideup"
        });
      };

      HomeView.prototype.set_user = function() {
        return $.ajax({
          url: "" + server_url + "/users/1",
          dataType: 'json',
          success: function(data) {
            current.user = data.user;
            collections.matches.add(data.matches);
            collections.decks.add(data.decks);
            user_channel = pusher.subscribe("" + current.user.id);
            if (views.lobby) {
              views.lobby.render();
            } else {
              views.lobby = new LobbyView;
            }
            return changePage("#lobby");
          },
          error: function(data) {
            alert("Sorry, there was an error. Please relink your account with facebook.");
            $('#loader').hide();
            return facebook_auth(set_user);
          }
        });
      };

      return HomeView;

    })(Backbone.View);
    $('#new_match_facebook').on('pageshow', function() {
      return $.getJSON("" + server_url + "/friends.json", function(data) {
        var friend, list, _i, _len, _ref, _results;
        $("#play_friends").html('');
        list = function(friend, type) {
          return $("#" + type).append("<label><input id='users_' name='users[]' type='checkbox' value='" + friend.id + "'>" + friend.name + "</label>").trigger('create');
        };
        _ref = data.play_friends;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          friend = _ref[_i];
          _results.push(list(friend, 'play_friends'));
        }
        return _results;
      });
    });
    $('#new-match-username-form').submit(function(e) {
      if ($('#username').val() === current.user.username) {
        alert("You can't start a game with yourself!");
      } else {
        $.post("" + server_url + "/matches.json", $(this).serialize(), function(data) {
          var error, _i, _len, _ref, _results;
          if (data.errors.length > 0) {
            _ref = data.errors;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              error = _ref[_i];
              _results.push(alert(error));
            }
            return _results;
          } else {
            alert("match created");
            current.lobby.render();
            return changePage("#lobby", {
              transition: "none"
            });
          }
        }, 'json');
      }
      return e.preventDefault();
    });
    $(document).bind('touchmove', function(e) {
      if (window.inAction) {
        return e.preventDefault();
      } else {
        return window.globalDrag = true;
      }
    }).bind('touchend touchcancel', function(e) {
      return window.globalDrag = false;
    });
    return views.home = new HomeView;
  }