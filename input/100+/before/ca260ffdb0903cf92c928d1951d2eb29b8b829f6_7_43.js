function(){if(this.data&&this.data.length&&this.data.length>1){this.switchScroller();joStack.prototype.home.call(this);}},push:function(o){if(this.data&&this.data.length&&this.data[this.data.length-1]===o)
return;this.switchScroller();joDOM.removeCSSClass(o,'flick');joDOM.removeCSSClass(o,'flickback');this.scroller.setData(o);this.scroller.scrollTo(0,true);joStack.prototype.push.call(this,o);}