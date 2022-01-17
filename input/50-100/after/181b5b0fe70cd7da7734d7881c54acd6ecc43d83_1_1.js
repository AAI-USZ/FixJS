function(){
    		var position = that.position();
    		that.trigger("gotoedit.tplview", $.extend(
    				that.position(), {width: that.width(), height: that.height()}
    			)
    		);
    		_hideQtip();

    		_remove();
    	}