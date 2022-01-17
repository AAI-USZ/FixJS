function(props)
  {
    if (props)
    {
      var localpart = props.identifier;
      this._autocompletion_localpart = localpart;
      this._autocompletion_scope = props.scope;
      var has_uppercase_letter = /[A-Z]/.test(localpart);
      var matches = props.props.filter(function(candidate) {
        // If only lowercase letters are used, make the autocompletion case-insensitive
        if (!has_uppercase_letter)
        {
            candidate = candidate.toLowerCase();
        }
        return candidate.startswith(localpart);
      });

      if (! matches.length) {
        return;
      }

      var match = this._longest_common_prefix(matches.slice(0));
      if (match.length > localpart.length || matches.length == 1)
      {
        var is_partial_completion = match.length > localpart.length &&
                                    matches.length !== 1;
        this._update_textarea_value(match, is_partial_completion);
      }
      else
      {
        this._data.add_input(this._textarea.value, true);
        this._data.add_output_completion(matches.sort(cls.PropertyFinder.prop_sorter).join(", "),
                                         true);
        this.mode = "autocomplete";

        var completions = this._linelist.querySelectorAll(".repl-completion");
        this._autocompletion_elem = completions[completions.length-1];
        this._autocompletion_elem = this._autocompletion_elem.parentNode;


        // the recent autocomplete array contains tuples, (word, start, end)
        // that can be used when selecting a range.
        var offset = 0;
        this._recent_autocompletion = matches.sort(cls.PropertyFinder.prop_sorter).map(function(word) {
          var ret = [word, offset, offset+word.length];
          offset += word.length + 2; // +2 accounts for ", "
          return ret;
        });

        // fixme: this should not rely as much on the inards of the markup
        this._autocompletion_elem = this._autocompletion_elem.firstChild;
        this._autocompletion_index = -1;
        this._update_highlight();
        this._textarea.focus();
      }
    }
    else
    {
      var current_selection = this._service.get_selected_objects();
      var context = {};
      for (var n=0; n<current_selection.length; n++)
      {
        context["$" + n] = current_selection[n];
      }

      this._resolver.find_props(this._on_completer.bind(this),
                                this._textarea.value.slice(0, this._textarea.selectionStart),
                                window.stop_at.getSelectedFrame(), context);
    }
  }