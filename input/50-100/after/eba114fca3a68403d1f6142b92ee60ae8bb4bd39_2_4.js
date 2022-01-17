function() {
      if (this.pending_backstroke) {
        this.choice_destroy(this.pending_backstroke.down("a"));
        return this.clear_backstroke();
      } else {
        this.pending_backstroke = this.search_container.siblings("li.search-choice").last();
        if (this.single_backstroke_delete) {
          return this.keydown_backstroke();
        } else {
          return this.pending_backstroke.addClassName("search-choice-focus");
        }
      }
    }