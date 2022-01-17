function(e){this.endedEvent.fire(this.repeat);if(++this.repeat<this.repeatCount)
this.play();else
this.repeat=0;},setRepeatCount:function(repeat){this.repeatCount=repeat;this.repeat=0;return this;}