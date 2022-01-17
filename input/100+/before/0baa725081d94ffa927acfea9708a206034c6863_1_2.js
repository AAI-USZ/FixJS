function () {
            var mark = this.model.toJSON();
            var ears = P.ears[mark.cutId];
            var districtName = P.Areas[mark.area].districts[mark.district].name;
            this.$el.html(this.options.template({
                districtName: districtName,
                mark: mark,
                left: ears[0],
                right: ears[1]
            }));
            return this;
        }