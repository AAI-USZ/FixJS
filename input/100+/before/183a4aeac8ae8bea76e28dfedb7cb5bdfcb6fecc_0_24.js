function(action) {


switch (action) {
	case "directions":
    	this.cmdMenuModel.items[0].items = [{icon:'back', command:'back-step', disabled: true},
          {icon:'forward', command:'forward-step'}];
        this.controller.modelChanged( this.cmdMenuModel );
        this.MayBubblePop = true;
        this.toggleDirectInfoBubble(this.DirectinfoBubbles[0], this.Directmarkers[0]);
	break;
	case "normal":
		this.cmdMenuModel.items[0].items = [];
		this.controller.modelChanged( this.cmdMenuModel );
	break;
	};

}