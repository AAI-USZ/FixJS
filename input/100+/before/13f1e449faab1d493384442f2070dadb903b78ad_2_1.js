function(rendered) {
      self.el.innerHTML = rendered.el;
      callback(self.el);
    }