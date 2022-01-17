function(node, config) {
    this.node = node;
    this.config = config;
    this.tweens = [];
    var that = this;

    // add tween for each property
    function addTween(c, attrs, obj, rootObj) {
        for(var key in c) {
            if(key !== 'duration' && key !== 'easing' && key !== 'callback') {
                // if val is an object then traverse
                if(Kinetic.GlobalObject._isObject(c[key])) {
                    obj[key] = {};
                    addTween(c[key], attrs[key], obj[key], rootObj);
                }
                else {
                    that._add(that._getTween(attrs, key, c[key], obj, rootObj));
                }
            }
        }
    }
    var obj = {};
    addTween(config, node.attrs, obj, obj);

    var finishedTweens = 0;
    for(var n = 0; n < this.tweens.length; n++) {
        var tween = this.tweens[n];
        tween.onFinished = function() {
            finishedTweens++;
            if(finishedTweens >= that.tweens.length) {
                that.onFinished();
            }
        };
    }
}