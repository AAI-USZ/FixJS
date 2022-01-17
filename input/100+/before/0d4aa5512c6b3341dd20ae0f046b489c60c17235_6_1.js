function () {
      var self = this;
      /* First, render the template so we have the elements we expect in DOM. */
      $('#guidealtitudeview').replaceWith(this.renderTemplate().el)

      /* render just updates the DOM via jQuery. */
      this.model.bind('change', this.render, this);
      this.render();

      $('#altinput').change(function () {
        self.model.set({ alt : $('#altinput').val() })
      });

      $('#altinput_submit').click(function() {
        console.log('altinput_submit');
        self.model.send();
      });
    }