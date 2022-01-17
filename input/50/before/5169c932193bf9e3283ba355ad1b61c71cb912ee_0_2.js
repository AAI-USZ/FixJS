function() {
            that._updateIndex();
            if(that.afterFrameFunc && that.attrs.index === that.afterFrameIndex) {
                that.afterFrameFunc();
            }
        }