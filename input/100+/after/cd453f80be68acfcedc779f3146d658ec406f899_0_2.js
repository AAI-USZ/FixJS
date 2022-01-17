function() {
      var actives, nexts, sibs;
      actives = this.search_results.select("li.active-result");
      console.log(actives);
      if (actives.length) {
        if (!this.result_highlight) {
          this.result_do_highlight(actives.first());
        } else if (this.results_showing) {
          sibs = this.result_highlight.nextSiblings();
          nexts = sibs.intersect(actives);
          if (nexts.length) {
            this.result_do_highlight(nexts.first());
          }
        }
        if (!this.results_showing) {
          return this.results_show();
        }
      }
    }