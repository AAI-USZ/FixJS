function () {
            var mark = this.model.toJSON();
            var ears = P.ears[mark.cutId];
            var districtName = P.Areas[mark.area].districts[mark.district].name;
            var svg = this.options.templates.svg({
                left: ears[0],
                right: ears[1]
            });
            this.$el.html(this.options.templates.mark({
                districtName: districtName,
                mark: mark
            }));
            if (Modernizr.inlinesvg) {
                this.$('.image').prepend(svg);
            } else {
                this.$('.image').prepend(this.options.templates.canvas());
                canvg(this.$('canvas')[0], svg.trim());
            }
            return this;
        }