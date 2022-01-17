function() {
  var id = 0;

  function FriendSearch(input, friends) {
    id++;

    var self = this;

    this.input = input;
    this.graph = new Graph();
    this.containerId = 'fac-' + id;
    this.containerSelector = '#' + this.containerId;

    for (var i=0; i < friends.length; i++) {
      this.graph.insert(friends[i].name, friends[i].id);
    }

    $(function() {
      var select = function(item) {
        if (item.length > 0) {
          $(self.input).trigger('selected', item.data('facebook-id'));
          self.dismissHints();
        }
      };

      $(self.input).on('input', function(e) { self.search($(self.input).val()); });
      $(self.input).on('keydown', function(e) {
        if (e.which == 40) { // Down arrow
          self.moveSelection('down');
        }
        else if (e.which == 38) { // Up arrow
          self.moveSelection('up');
        }
        else if (e.which == 13) { // Enter/return
          var active = $(self.containerSelector + ' .fac-item.active');
          select(active);
        }
        else if (e.which == 27) {
          self.dismissHints();
        }
      });

      self.appendStyle();
      $(self.containerSelector).remove();
      $('body').append('<div class="fac-container" id="' + self.containerId + '"></div>');
      $(self.containerSelector + ' .fac-item').live('mouseenter', function() {
        var current = $(self.containerSelector + ' .fac-item.active');
        current.removeClass('active');
        $(this).addClass('active');

        self.hoveringOnHint = true;
      });

      $(self.containerSelector + ' .fac-item').live('mouseleave', function() {
        self.hoveringOnHint = false;
      });

      $(self.containerSelector + ' .fac-item').live('click', function() {
        select($(this));
      });

      $(self.input).focusout(function() {
        if (self.hoveringOnHint) {
          return;
        }

        self.dismissHints();
      });

      $(self.input).focusin(function() {
        self.search($(self.input).val());
      });
    });
  };


  FriendSearch.prototype.search = function(prefix) {
    prefix = this.graph.normalize(prefix);

    if (prefix == "") {
      this.dismissHints();
    }
    else {
      var results = {};
      var tokens = prefix.split(/\s/);

      for (var i=0; i < tokens.length; i++) {
        var friends = this.graph.prefixedBy(tokens[i]);

        if (i == 0) {
          results = friends;
        }
        else {
          for (var key in results) {
            if (!friends.hasOwnProperty(key)) {
              delete results[key];
            }
          }
        }
      }

      this.displayHints(results);
    }
  };

  FriendSearch.prototype.dismissHints = function() {
    $(this.containerSelector).css('display', 'none');
  }

  FriendSearch.prototype.moveSelection = function(direction) {
    var current = $(this.containerSelector + ' .fac-item.active');
    if (current.length == 0) {
      if (direction == 'up') {
        $(this.containerSelector + ' .fac-item:last').addClass('active');
      }
      else {
        $(this.containerSelector + ' .fac-item:first').addClass('active');
      }
    }
    else {
      current.removeClass('active');

      if (direction == 'up') {
        current.prev().addClass('active');
      }
      else {
        current.next().addClass('active');
      }
    }
  };

  FriendSearch.prototype.appendStyle = function() {
    var styles = [
      ".fac-container { background-color: white; border: 1px solid #000; overflow: hidden; display: none; }",
      ".fac-item { cursor: pointer; min-height: 50px; padding: 2px 30px 2px 63px;  border-top: 1px solid white; border-bottom: 1px solid white; }",
      ".fac-item img { position: absolute; left: 6px; height: 50px; width: 50px; }",
      ".fac-name, .fac-footer { color: #3b5998; font-weight: bold; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; font-size: 11px; line-height: 18px; }",
      ".fac-item.active { background-color: #6d84b4; border-color: #3b5998; }",
      ".fac-item.active .fac-name { color: #fff; }",
      ".fac-footer { background-color: #f7f7f7; border: 1px solid #ddd; text-align: center; min-height: 20px; padding: 10px; }"
    ];
    $('head').append('<style type="text/css">' + styles.join("\n") + '</style>');
  };

  FriendSearch.prototype.clear = function() {
    $(this.containerSelector).empty();
    $(this.containerSelector).
      css('display', 'block').
      css('position', 'absolute').
      css('left', $(this.input).offset().left).
      css('top', $(this.input).offset().top + $(this.input).outerHeight()).
      css('width', $(this.input).outerWidth());
  };

  FriendSearch.prototype.displayHints = function(friends) {
    this.clear();

    var i = 0;
    for (var id in friends) {
      if (i > 4) {
        break;
      }

      var friendId = id;
      var friendName = friends[id];

      var friendDiv = $('<div class="fac-item" data-facebook-id="' + friendId + '"></div>');
      var friendImg = $('<img src="//graph.facebook.com/' + friendId + '/picture" />');
      var friendName = $('<div class="fac-name">' + friendName + '</div>');

      friendDiv.append(friendImg);
      friendDiv.append(friendName);

      $(this.containerSelector).append(friendDiv);

      i++;
    }

    if (i > 0) {
      var footer = $('<div class="fac-footer"> Showing results for ' + $(this.input).val() + '</div>');
      $(this.containerSelector).append(footer);
    }
    else {
      var footer = $('<div class="fac-footer">No friends for ' + $(this.input).val() + ' :-(</div>');
      $(this.containerSelector).append(footer);
    }
  };

  return FriendSearch;
}