function() {
      if (!(this.quoted || this.quasiquoted || this.unquote_spliced)) {
        return call_macro_transform.apply(null, ["call"].concat(__slice.call(this.value)));
      }
    }