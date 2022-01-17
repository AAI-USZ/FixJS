function (selectVal) {
            if (selectVal) this.setColor(RED);
            else this.hover(this.get('hovered'));

            this.set('selected', selectVal);
            this.set('origPos', this.get('mesh').position);
        }