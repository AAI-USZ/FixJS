function() {
      var checkbox, checked, dialog, html, input, name, title, _i, _len, _ref;
      html = "<div class=move><span id=count></span> <span id=timer>-" + Conf['Interval'] + "</span></div>";
      checkbox = Config.updater.checkbox;
      for (name in checkbox) {
        title = checkbox[name][1];
        checked = Conf[name] ? 'checked' : '';
        html += "<div><label title='" + title + "'>" + name + "<input name='" + name + "' type=checkbox " + checked + "></label></div>";
      }
      checked = Conf['Auto Update'] ? 'checked' : '';
      html += "<div><label title='Controls whether *this* thread automatically updates or not'>Auto Update This<input name='Auto Update This' type=checkbox " + checked + "></label></div><div><label>Interval (s)<input name=Interval value=" + Conf['Interval'] + " class=field size=4></label></div><div><input value='Update Now' type=button></div>";
      dialog = UI.dialog('updater', 'bottom: 0; right: 0;', html);
      this.count = $('#count', dialog);
      this.timer = $('#timer', dialog);
      this.thread = $.id("t" + g.THREAD_ID);
      this.lastPost = this.thread.lastElementChild;
      _ref = $$('input', dialog);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        input = _ref[_i];
        if (input.type === 'checkbox') {
          $.on(input, 'click', $.cb.checked);
          if (input.name === 'Scroll BG') {
            $.on(input, 'click', this.cb.scrollBG);
            this.cb.scrollBG.call(input);
          }
          if (input.name === 'Verbose') {
            $.on(input, 'click', this.cb.verbose);
            this.cb.verbose.call(input);
          } else if (input.name === 'Auto Update This') {
            $.on(input, 'click', this.cb.autoUpdate);
            this.cb.autoUpdate.call(input);
            Conf[input.name] = input.checked;
          }
        } else if (input.name === 'Interval') {
          $.on(input, 'input', this.cb.interval);
        } else if (input.type === 'button') {
          $.on(input, 'click', this.update);
        }
      }
      $.add(d.body, dialog);
      this.retryCoef = 10;
      return this.lastModified = 0;
    }