function() {
      var list = this.presets;
      var store = this.app.store('Account');
      var output;

      this.accounts.innerHTML = '';

      Object.keys(list).forEach(function(preset) {
        var obj = list[preset];

        if (obj.singleUse) {
          if (store.presetActive(preset)) {
            return;
          }
        }

        output = template.provider.render({ name: preset });
        this.accounts.insertAdjacentHTML('beforeend', output);
      }, this);
    }