function() {
            var that = this;

            this.element = jQuery("<div>");

            $.each(this.items, function(index,value) {
                var obj = $.jB.util.filter(['region'],value);
                that.regions[value.region] = obj;
                that.regionHTML[value.region] = jQuery("<div>").attr("class","ui-layout-" + value.region).css($.jB.util.intersect(['width','height'],obj));
            });

            if (this.regions.center === undefined) {
                throw new Error("Center region is not defined in border layout");
            }

            $(window).resize(function() {
                that.runViewportPositioning(that);
            });
        }