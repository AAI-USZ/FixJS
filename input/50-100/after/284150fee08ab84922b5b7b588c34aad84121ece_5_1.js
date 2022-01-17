function getTextSize(text, font){
        switch(pv.renderer()){
            case 'vml':   return getTextSizeVML(text, font);
            case 'batik': return getTextSizeCGG(text, font);
        }

        return getTextSizeSVG(text, font);
    }