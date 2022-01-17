function(_super) {

    __extends(Confirmbox, _super);

    Confirmbox.name = 'Confirmbox';

    function Confirmbox(template) {
      Confirmbox.__super__.constructor.apply(this, arguments);
      this.modal.addClass('confirm-box');
      this.template = template;
      this.overlay.unbind('click');
    }

    Confirmbox.prototype.initConfirmation = function(contentString, callback) {
      var acceptBtn, confirmBoxContent, confirmMessage, deniedBtn,
        _this = this;
      confirmMessage = {
        confirmMessage: contentString
      };
      confirmBoxContent = $(this.template(confirmMessage));
      acceptBtn = confirmBoxContent.find('#accept');
      deniedBtn = confirmBoxContent.find('#denied');
      this.modal.find('.padding').html(confirmBoxContent);
      acceptBtn.bind('click', function() {
        callback(true);
        return _this.close();
      });
      deniedBtn.bind('click', function() {
        callback(false);
        return _this.close();
      });
      return this.open();
    };

    return Confirmbox;

  }