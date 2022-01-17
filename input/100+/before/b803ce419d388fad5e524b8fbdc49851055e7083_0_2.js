function Confirmbox(template) {
      Confirmbox.__super__.constructor.apply(this, arguments);
      this.modal.addClass('confirm-box');
      this.template = template;
      this.overlay.unbind('click');
    }