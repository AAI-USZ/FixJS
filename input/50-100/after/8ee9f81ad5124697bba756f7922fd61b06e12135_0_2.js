function(terms) {
      var create_option_html,
        _this = this;
      create_option_html = this.create_option_temp.evaluate({
        terms: terms,
        text: this.create_option_text
      });
      this.search_results.insert(create_option_html);
      return this.search_results.down(".create-option").observe("click", function(evt) {
        return _this.select_create_option(terms);
      });
    }