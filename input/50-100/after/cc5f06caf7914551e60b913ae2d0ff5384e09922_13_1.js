function (collectionView, itemView) {
            var items = this.collection.pluck('Id');
            var index = _.indexOf(items, itemView.model.id);
            log(index);

            var $li = collectionView.$el.find('ul > li:eq(' + (index) + ')');

            if ($li.length === 0) {
                collectionView.$el.find('ul').append(itemView.el);
            } else {
                $li.before(itemView.el);
            }
        }