function(index, justOutline) {
        if (this._highlighted != -1) {
            this._items[this._highlighted].remove_style_pseudo_class('outlined');
            this._items[this._highlighted].remove_style_pseudo_class('selected');
        }

        this._highlighted = index;

        if (this._highlighted != -1) {
            if (justOutline)
                this._items[this._highlighted].add_style_pseudo_class('outlined');
            else
                this._items[this._highlighted].add_style_pseudo_class('selected');
        }

        let [absItemX, absItemY] = this._items[index].get_transformed_position();
        let [result, posX, posY] = this.actor.transform_stage_point(absItemX, 0);
        let [containerWidth, containerHeight] = this.actor.get_transformed_size();
        
        if (posX + this._items[index].get_width() > containerWidth)
            this._scrollToRight();
        else if (absItemX < 0)
            this._scrollToLeft();
        if(Schema.get_enum("preview-mode") == 1) {
        	let app = this.icons[index];
        	Main.activateWindow(app.cachedWindows[0]);
        }
    }