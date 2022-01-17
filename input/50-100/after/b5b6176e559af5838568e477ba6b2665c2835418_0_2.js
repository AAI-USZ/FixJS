function (owner) {
                var markItem = new L.Views.Mark({
                    model: owner,
                    template: this.template
                });
                this.$el.append(markItem.render().el);
                this._markViews.push(markItem);
            }