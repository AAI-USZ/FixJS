function () {
        var selected = this.datasource[ this.selectedIndex ],
            word = this.staticText || ( selected ? selected.name : this.emptyLabel ),
            titleTip = this.staticText || ( selected ? selected.name : this.emptyText ),
            el = this._getCur();
            
        if ( this.titleTip ) {
            el.title = titleTip;    
        }
        el.innerHTML = '<nobr>' + word + '</nobr>';
        
        this._repaintLayer();
    }