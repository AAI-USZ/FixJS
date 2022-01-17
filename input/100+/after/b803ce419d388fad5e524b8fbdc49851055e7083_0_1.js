function() {

    Modalbox.name = 'Modalbox';

    function Modalbox() {
      this.close = __bind(this.close, this);
      this.modal = $('<div class="modal"><div class="padding"></div></div>');
      this.overlay = $('<span class="overlay"></span>');
      $('body').append(this.modal);
      $('body').append(this.overlay);
      this.overlay.bind('click', this.close);
    }

    Modalbox.prototype.open = function() {
      this.modal.addClass('visible');
      return this.overlay.addClass('visible');
    };

    Modalbox.prototype.close = function(callback) {
      var t,
        _this = this;
      callback = _.isFunction(callback) ? callback : function() {};
      this.modal.addClass('fadding');
      this.overlay.addClass('fadding');
      return t = setTimeout(function() {
        _this.modal.removeClass('visible fadding');
        _this.overlay.removeClass('visible fadding');
        return callback();
      }, 150);
    };

    Modalbox.prototype.setContent = function(content) {
      return this.modal.find('.padding').html(content);
    };

    return Modalbox;

  }