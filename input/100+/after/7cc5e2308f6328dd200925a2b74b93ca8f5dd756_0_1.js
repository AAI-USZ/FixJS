function() {

      if (this._placeholderVisible) {
        // If the placeholder is visible, we want to hide if the control has
        // been focused or the placeholder has been removed.
        if (this._focused || !this._placeholder) {
          this._placeholderVisible = false;
          this._control.value = '';
        }
      } else if (!this._focused) {
        // If the placeholder is not visible, we want to show it if the control
        // has benen blurred.
        if (this._placeholder && !this._control.value) {
          this._placeholderVisible = true;
        }
      }

      if (this._placeholderVisible) {
        // We need to resist the Tokenizer wiping the input on blur.
        this._control.value = this._placeholder;
      }

      JX.DOM.alterClass(
        this._control,
        'jx-typeahead-placeholder',
        this._placeholderVisible);
    }