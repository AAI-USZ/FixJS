function getFontSize(font){
        if(pv.renderer() == 'batik'){
            var sty = document.createElementNS('http://www.w3.org/2000/svg','text').style;
            sty.setProperty('font',font);
            return parseInt(sty.getProperty('font-size'), 10);
        }

        var holder = getTextSizePlaceholder();
        holder.css('font', font);
        return parseInt(holder.css('font-size'), 10);
    }