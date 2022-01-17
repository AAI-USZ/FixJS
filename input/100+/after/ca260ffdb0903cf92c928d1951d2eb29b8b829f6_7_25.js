function(index){if(this.data&&this.data.length&&index>=0&&index<this.data.length)
return this.data[index];else
return null;},getLength:function(){return this.length||this.data.length||0;},sort:function(){this.data.sort(this.compareItems);}