function (event) {
            if (event.which === Keys.Tab) {
                event.preventDefault();

                var offset = event.shiftKey ? -1 : 1;

                if (!_inAutoComplete) {
                    _text = $(this).val();
                    var sel = getSelection(this);
                    _caret = sel.end;

                    // find initial text (starts with prefix char)
                    var match = _text.substr(0, _caret).match(_matchRegExp);
                    if (!match) return;

                    _initial = match.toString().substr(1).toLowerCase();

                    // get prefix character to pass to get()
                    _prefix = match.toString().substring(0, 1);

                    _inAutoComplete = true;
                }

                // call get() to retrieve current list of values
                var values = options.get(_prefix);
                if (values.length === 0) {
                    reset();
                    return;
                }

                _index = getNextIndex(_index, offset, values.length);

                var initialLen = _initial.length;
                // sort values if there's a prefix
                if (initialLen > 0) {
                    values = values.sort(sortInsensitive);
                }

                // loop through values (ring buffer) for match 
                var i = _index;
                while (true) {
                    var value = values[i];
                    if (value.substr(0, initialLen).toLowerCase() === _initial) {
                        var newText = _text.substr(0, _caret - initialLen) + value + _text.substr(_caret);
                        $(this).val(newText);

                        if (_caret < _text.length) {
                            setSelection(this, _caret, _caret);
                        }
                        break;
                    }
                    i = getNextIndex(i , offset, values.length);
                    if (i === _index) break;
                }
                _index = i;
                return;
            }
            else {
                if (event.which === Keys.Shift) return; // ignore shift key press
                reset();
            }
        }