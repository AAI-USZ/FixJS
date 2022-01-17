function (collectionView, itemView) {
            collectionView.$el.find('#' + this.type + '-menu-group-list').append(itemView.el);
        }