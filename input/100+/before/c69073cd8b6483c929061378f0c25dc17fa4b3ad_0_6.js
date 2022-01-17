function getLabelSize(textWidth, textHeight, align, baseline, angle, margin){
        var width  = margin + Math.abs(textWidth * Math.cos(-angle));
        var height = margin + Math.abs(textWidth * Math.sin(-angle));
        return {
            width:  width,
            height: height
        };
    }