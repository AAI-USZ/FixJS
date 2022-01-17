function() {
      var checkbox, checked, dialog, html, input, name, title, _i, _len, _ref;
      html = '<div class=move><span id=count></span> <span id=timer></span></div>';
      checkbox = Config.updater.checkbox;
      for (name in checkbox) {
        title = checkbox[name][1];
        checked = Conf[name] ? 'checked' : '';
        html += "<div><label title='" + title + "'>" + name + "<input name='" + name + "' type=checkbox " + checked + "></label></div>";
      }
      checked = Conf['Auto Update'] ? 'checked' : '';
      html += "      <div><label title='Controls whether *this* thread automatically updates or not'>Auto Update This<input name='Auto Update This' type=checkbox " + checked + "></label></div>      <div><label>Interval (s)<input type=number name=Interval class=field min=1></label></div>      <div><input value='Update Now' type=button name='Update Now'></div>";
      dialog = UI.dialog('updater', 'bottom: 0; right: 0;', html);
      this.count = $('#count', dialog);
      this.timer = $('#timer', dialog);
      this.thread = $.id("t" + g.THREAD_ID);
      this.unsuccessfulFetchCount = 0;
      this.lastModified = '0';
      _ref = $$('input', dialog);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        input = _ref[_i];
        if (input.type === 'checkbox') {
          $.on(input, 'click', $.cb.checked);
        }
        switch (input.name) {
          case 'Scroll BG':
            $.on(input, 'click', this.cb.scrollBG);
            this.cb.scrollBG.call(input);
            break;
          case 'Verbose':
            $.on(input, 'click', this.cb.verbose);
            this.cb.verbose.call(input);
            break;
          case 'Auto Update This':
            $.on(input, 'click', this.cb.autoUpdate);
            this.cb.autoUpdate.call(input);
            break;
          case 'Interval':
            input.value = Conf['Interval'];
            $.on(input, 'change', this.cb.interval);
            this.cb.interval.call(input);
            break;
          case 'Update Now':
            $.on(input, 'click', this.update);
        }
      }
      $.add(d.body, dialog);
      $.on(d, 'QRPostSuccessful', this.cb.post);
      return $.on(d, 'visibilitychange ovisibilitychange mozvisibilitychange webkitvisibilitychange', this.cb.visibility);
    }