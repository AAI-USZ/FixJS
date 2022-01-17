function(displayText, addOverlay) {
        
        var overlay, that = this;
        if(addOverlay) overlay = this.addOverlay();
        
        if (actInd) actInd.hide().off();
        else {
            actInd = $('<div></div>').hide()
                    .append('<div id="spinner" style="position:relative; top:15px;"/>')
                    .append('<div id="text" style="margin: 45px 0 -5px 0;"/>');
            actInd.appendTo(document.body);
        }
        
        actInd[0].style.cssText = 'background-color:black; position: absolute; padding: 20px; color:white;' +
                                  '-webkit-border-radius: 10px; text-align: center; z-index:1000';
        
        actInd.children('#text').text(displayText || 'Loading...');
        
        var parentPos = this.offset();
        parentPos = (parentPos) ? parentPos : {left: 0, top: 0};
        var leftPos = parentPos.left + (this.width() - actInd.outerWidth(false))/2;
        var topPos = parentPos.top + (this.height() - actInd.outerHeight(false))/2;
        actInd.css('left', leftPos).css('top', topPos);
        
        actInd[0].style.cssText += ';-webkit-transition:-webkit-transform 100ms ease-out;';
        actInd.show().children('#spinner').spin('large', 'white');
        
        return {
            hide: function() {
                actInd.css('-webkit-transition-property', '-webkit-transform, opacity');
                actInd.on('webkitTransitionEnd', function() { actInd.hide(); });
                actInd.css({webkitTransform: 'scale3d(0.5, 0.5, 1)', opacity: '0'});
                actInd.children('#spinner').spin(false);
                if(overlay) overlay.hide();
            }
        };
    }