function getTextSizeCGG(text, font){
        var fontInfo = getFontInfoCGG(font);
        
        // TODO: Add cgg size method
        return {
            /*global getTextLenCGG:true */
            width:  getTextLenCGG(text, fontInfo.family, fontInfo.size, fontInfo.style, fontInfo.weight),
            /*global getTextHeightCGG:true */
            height: getTextHeightCGG(text, fontInfo.family, fontInfo.size, fontInfo.style, fontInfo.weight)
        };
    }