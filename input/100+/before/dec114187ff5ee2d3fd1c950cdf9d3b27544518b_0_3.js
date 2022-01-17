function(obj) {
      	var $this = obj || this;
      	$this.options.windowWidth = $(window).width();
      	$this.options.colWidth = $('.pin').outerWidth();
      	$this.options.blocks = [];
      	$this.options.colCount = Math.floor($this.options.windowWidth/($this.options.colWidth+$this.options.margin*2));
      	for(var i=0;i<$this.options.colCount;i++){
      	  $this.options.blocks.push($this.options.margin);
      	}
      	this.positionBlocks();
      }