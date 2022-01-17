function(rangeToKeep) {
        console.log('deRender top:'+rangeToKeep.top+ " bottom:"+rangeToKeep.bottom);
        for (var i in this.renderedRows) {
            if (i < rangeToKeep.top || i > rangeToKeep.bottom) {
                this.deRenderRow(i);
            }
        }
    }