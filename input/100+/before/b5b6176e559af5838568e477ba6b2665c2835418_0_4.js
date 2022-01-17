function (districts) {
            this._clearExistingViews();
            var self = this;
            _.chain(this._currentCollection).filter(function (owner) {
                    return _.indexOf(districts, owner.district) > -1;
                }).each(function (owner) {
                    var markItem = new L.Views.Mark({
                        model: owner,
                        template: self.template
                    });
                    self.$el.append(markItem.render().el);
                    self._markViews.push(markItem);
            });
            return this;
        }