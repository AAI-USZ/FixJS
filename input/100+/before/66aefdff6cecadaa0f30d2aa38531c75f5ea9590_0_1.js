function() {
        var canvas, promise;
        NumericFacet.__super__.render.call(this);
        this.container = this.make("div", {
          "class": "facet-content im-facet"
        });
        this.$el.append(this.container);
        canvas = this.make("div");
        $(this.container).append(canvas);
        this.paper = Raphael(canvas, this.$el.width(), 75);
        promise = this.query.summarise(this.facet.path, this.handleSummary);
        promise.fail(this.remove);
        return this;
      }