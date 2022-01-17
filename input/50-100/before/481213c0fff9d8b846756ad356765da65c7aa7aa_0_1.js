function () {
        var selected = this.datasource[ this.selectedIndex ],
            word = this.staticText || ( selected ? selected.name : this.emptyLabel ),
            el = this._getCur();
            
        el.title = word;
        el.innerHTML = '<nobr>' + word + '</nobr>';
        
        this._repaintLayer();
    }