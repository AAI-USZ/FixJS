function (owner) {
                    var markItem = new L.Views.Mark({
                        model: owner,
                        template: self.template
                    });
                    self.$el.append(markItem.render().el);
                    self._markViews.push(markItem);
            }