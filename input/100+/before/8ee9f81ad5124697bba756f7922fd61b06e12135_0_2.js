function(terms, selected) {
      var add_item_link,
        _this = this;
      add_item_link = '';
      if (this.create_option && !selected) {
        add_item_link = this.add_link_temp.evaluate();
      }
      this.search_results.insert(this.no_results_temp.evaluate({
        terms: terms,
        add_item_link: add_item_link
      }));
      if (this.create_option && !selected) {
        return this.search_results.down("a.option-add").observe("click", function(evt) {
          if (!selected) {
            return _this.select_create_option(terms);
          }
        });
      }
      /*  
        
      no_results_html = $('<li class="no-results">' + @results_none_found + ' "<span></span>"</li>')
      no_results_html.find("span").first().html(terms)
      
      @search_results.append no_results_html
      
      if @create_option #and not selected
        this.show_create_option( terms )
      */

    }