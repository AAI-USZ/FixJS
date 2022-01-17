function(layoutInfo){
        var requestSize = new pvc.Size();
        
        // TODO: take textAngle, textMargin and textBaseline into account
        
        // Naming is for anchor = top
        var a = this.anchor;
        var a_width  = this.anchorLength(a);
        var a_height = this.anchorOrthoLength(a);
        
        var desiredWidth = layoutInfo.desiredClientSize[a_width];
        if(desiredWidth == null){
            desiredWidth = pvc.text.getTextLength(this.title, this.font) + 2; // Small factor to avoid cropping text on either side
        }
        
        var lines;
        var clientWidth = layoutInfo.clientSize[a_width];
        if(desiredWidth > clientWidth){
            desiredWidth = clientWidth;
            lines = pvc.text.justify(this.title, desiredWidth, this.font);
        } else {
            lines = this.title ? [this.title] : [];
        }
        
        // -------------
        
        var lineHeight = pvc.text.getTextHeight("m", this.font);
        
        var desiredHeight = layoutInfo.desiredClientSize[a_height];
        if(desiredHeight == null){
            desiredHeight = lines.length * lineHeight;
        }
        
        var availableHeight = layoutInfo.clientSize[a_height];
        if(desiredHeight > availableHeight){
            // Don't show partial lines unless it is the only one left
            var maxLineCount = Math.max(1, Math.floor(availableHeight / lineHeight));
            if(lines.length > maxLineCount){
                var firstCroppedLine = lines[maxLineCount];  
                
                lines.length = maxLineCount;
                
                desiredHeight = maxLineCount * lineHeight;
                
                var lastLine = lines[maxLineCount - 1] + " " + firstCroppedLine;
                
                lines[maxLineCount - 1] = pvc.text.trimToWidthB(desiredWidth, lastLine, this.font, "..");
            }
        }
        
        layoutInfo.lines = lines;
        
        layoutInfo.lineSize = {
           width:  desiredWidth,
           height: lineHeight
        };
        
        layoutInfo.a_width   = a_width;
        layoutInfo.a_height  = a_height;
        
        requestSize[a_width]  = desiredWidth;
        requestSize[a_height] = desiredHeight;
        
        return requestSize;
    }