function(){
    		var position = that.position();
    		that.trigger("gotoedit.tplview", $.extend(
    				that.position(), {width: that.width(), height: that.height()}
    			)
    		);
    		that.find('.note').qtip("hide");
    		_remove();
    	}