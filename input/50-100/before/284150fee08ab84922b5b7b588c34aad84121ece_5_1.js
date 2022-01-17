function getTextLength(text, font){
        switch(pv.renderer()){
            case 'vml':
                return getTextLenVML(text, font);

            case 'batik':
                font = splitFontCGG(font);

                // NOTE: the global function 'getTextLenCGG' must be
                // defined by the CGG loading environment
                /*global getTextLenCGG:true */
                return getTextLenCGG(text, font.fontFamily, font.fontSize, font.fontStyle, font.fontWeight);

            //case 'svg':
        }

        return getTextLenSVG(text, font);
    }