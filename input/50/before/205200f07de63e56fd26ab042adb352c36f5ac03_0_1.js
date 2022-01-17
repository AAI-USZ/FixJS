function(func){
        var timeline = this;
        this.add(new enchant.tl.Action({
                    onactionstart: func,
                    onactiontick: function(evt){
                        timeline.next();
                    }
                }));
        return this;
    }