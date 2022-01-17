function() {
        	var index = that.attrs.index;
            that._updateIndex();
            if(that.afterFrameFunc && index === that.afterFrameIndex) {
                that.afterFrameFunc();
            }
        }