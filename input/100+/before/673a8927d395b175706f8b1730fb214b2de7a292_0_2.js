function ($div, html, controller, action) {
    var self = this,
        siblings = this.config.$breadcrumb.siblings();
    $div.hide();
    if (html && html !== '' && html !== true) {
      $div.html(html);
    } else if (html === true) {
      this.template(controller, action, {}, function (html) {
        $div.html(html);
        if (typeof(self.views[controller]) !== 'undefined' &&
            typeof(self.views[controller][action]) !== 'undefined') {
          new self.views[controller][action]($div);
          // TODO: change this to call the views render() function and let that handle the templating
        }
      });
    }
    if (siblings.length === 0) {
     $div.show();
    } else {
      siblings.hide();
      $div.fadeIn(300);
    }
  }