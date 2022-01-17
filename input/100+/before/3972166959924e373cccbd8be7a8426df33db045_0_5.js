function(rowNum) {
        var dataItem = this.contentAt(rowNum);

        if (dataItem) {
            var properties={};
            properties[this.dataFieldName] = dataItem;
            properties['top'] = (rowNum * this.rowHeight) + "px";
            var rowView = this.rowsCache.pop();

            if (!rowView){
                rowView = this.createChildView(this.itemViewClass, properties);
                this.get('childViews').pushObject (rowView);
            } else{
                rowView.setProperties(properties);
            }

            if (this.renderedHook){
                Em.run.later(rowView, this.renderedHook, 50);
            }
            return rowView;
        }
        return null;
    }