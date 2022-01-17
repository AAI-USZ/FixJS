function (owner) {
                var markItem = new L.Views.Mark({
                    model: owner,
                    templates: this.templates
                });
                this.$el.append(markItem.render().el);
                this._markViews.push(markItem);
            }