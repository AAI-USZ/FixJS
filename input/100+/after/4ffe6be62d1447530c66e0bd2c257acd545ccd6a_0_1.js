function(e, el) {
        e.stop();
        var selection = $$('.thumbnail.selected');
        var id = (Browser.ie) ? el.parentNode.parentNode.getProperty('dataset-frog_tn_id') : el.parentNode.parentNode.dataset.frog_tn_id;
        var objects = [];
        if (selection.length) {
            this.thumbnails[id].setSelected(true);
            selection = $$('.thumbnail.selected');
            selection.each(function(item, selID) {
                var idx = (Browser.ie) ? item.getProperty('dataset-frog_tn_id') : item.dataset.frog_tn_id;
                if (idx === id) {
                    id = selID;
                }
                objects.push(this.objects[idx]);
            }, this);
            objects = objects.unique();
            this.viewer.show();
            this.viewer.setImages(objects, id);
        }
        else {
            var objects = Array.clone(this.objects);
            this.viewer.show();
            this.viewer.setImages(objects, id);

        }

        this.y = window.getScroll().y;
    }