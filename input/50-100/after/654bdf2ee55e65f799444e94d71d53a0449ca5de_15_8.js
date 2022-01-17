function (collectionView, itemView) {
            var index = collectionView.collection.indexOf(itemView.model);
            if (index === 0) {
                collectionView.$el.find('#' + this.type + '-menu-group-list').append(itemView.el);
            } else {
                collectionView.$el.find('#' + this.type + '-menu-group-list > li').eq(index - 1).after(itemView.el);
            }
        }