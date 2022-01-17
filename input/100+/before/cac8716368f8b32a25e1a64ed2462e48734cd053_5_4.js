function () {
    var $form = this.view.$el;
    var self = this;
    
    var is_linked = $form.data('linked');
    if (is_linked) {
      return false;
    } else {
      $form.data('linked', true);
    }
    
    this.$inputs = $('input[data-link]', $form);
    
    $form.delegate('input[data-link]', 'blur', function () {
      self.blurHandler(this);
    });
    
    this.$inputs.each(function () {
      if ($(this).attr('required')) {
        self.model.required.push($(this).attr('name'));
      }
    });
    
    this.model.bind("valid", function (model, attributes) {
      _.each(attributes, function (val, key) {
        self.setSuccess(key, val);
      });
    });
    
    this.model.bind("error", function(model, error) {
      _.each(error, function (val, key) {
        self.clearLoading(key);
        self.setError(key, val);
      });
    });
    
    $form.delegate('button', 'click', function (e) {
      if ($(e.target).data('form') !== 'submit') {
        e.preventDefault();
      }
    });
    
    $form.bind('submit', function (e) {
      e.preventDefault();
      getCsrf(function () {
        self.submit.call(self, e);
      });
    });
    
    return this;
  }