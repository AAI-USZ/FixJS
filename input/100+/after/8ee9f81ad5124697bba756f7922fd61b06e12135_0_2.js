function(terms) {
      var no_results_html;
      no_results_html = this.no_results_temp.evaluate({
        terms: terms,
        text: this.results_none_found
      });
      this.search_results.insert(no_results_html);
      if (this.create_option) {
        return this.show_create_option(terms);
      }
    }