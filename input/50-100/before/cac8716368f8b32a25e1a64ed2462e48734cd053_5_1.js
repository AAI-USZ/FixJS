function () {
    var $label = this.view.$el.find('[data-label]');
    var i18n = this.view.i18n;
    $label.each(function () {
      var $this = $(this);
      var str = 'forms.labels.'+$this.data('label');
      $this.html(jQuery.t(str, i18n[1], i18n[0]));
      $this.data('label', null);
    });
  }