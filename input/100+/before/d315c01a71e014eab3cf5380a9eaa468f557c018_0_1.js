function (main) {
        if (this._main || !main) {
            return;
        }
        
        ui.Base.render.call(this, main);
        main.style.position = 'absolute';
        main.style.left     = this._HIDE_POS;
        main.style.top      = this._HIDE_POS;
        main.style.zIndex   = this.zIndex || '90000';
        this.width  && (main.style.width = this.width + 'px');
        this.height && (main.style.height = this.height + 'px');
        
        
        switch (this.autoHide.toLowerCase()) {
        case 'click':
            this._clickHandler = this._getClickHider();
            baidu.on(document, 'click', this._clickHandler);
            break;
        case 'out':
            main.onmouseout = this._getOutHandler();
            main.onmouseover = this._getOverHandler();
            break;
        }
    }