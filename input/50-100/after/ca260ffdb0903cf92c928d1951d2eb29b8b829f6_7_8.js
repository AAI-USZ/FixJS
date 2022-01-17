function(state){this.autoSort=state;return this;},next:function(){if(this.getValue()<this.getLength()-1)
this.setValue(this.value+1);return this;}