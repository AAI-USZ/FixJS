function() {
      var _this = this;
      HomeZipCodeFormField.__super__.initialize.call(this);
      return this.$el.on("change blur", function() {
        return _this.zipLookup(_this.value());
      });
    }