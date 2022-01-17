function(rangeToKeep) {
        if (rangeToKeep) console.log('deRender top:'+rangeToKeep.top+ " bottom:"+rangeToKeep.bottom);
        for (var i in this.content) {
            if (Em.none(rangeToKeep) || i < rangeToKeep.top || i > rangeToKeep.bottom) {
                this.deRenderRow(i);
            }
        }
    }