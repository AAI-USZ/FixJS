function() {
	if (this.items.length <= this.visible_items) { return }
	if (this.option.isGallery && this.first() === 1) {
	  this.base.trigger("jRollover.reachedLeft", this.option.$prev ) 
    } 
	if (this.option.isGallery && this.first() < 1) {
	  this.sliding = false;
	  return
	} 
	var prev = ((this.first()+this.items.length)-1)%this.items.length
	var left = parseInt(this.items[this.first()].css('left'),10)-this.item_width
	this.items[prev].css('left', left)
	this.items_first = prev 
	this.base.trigger("jRollover.Prev");
	var self = this;
	this.direction(+1, function() { self.base.trigger("jRollover.nowVisible", [self.nowVisible(), self.items]); })
  }