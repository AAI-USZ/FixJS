function(infoTip, fontName)
    {
        var fontStyles = [
           "font-size:12px;",
           "font-weight:bold; font-size:12px;",
           "font-style:italic; font-size:12px;",
           "font-size:14px;",
           "font-size:18px;"
        ];
        var fontObject = Fonts.getFontInfo(null, null, fontName.replace(/"/g, ""));

        if (FBTrace.DBG_INFOTIP)
        {
            FBTrace.sysout("infotip.populateFontFamilyInfoTip;", {fontName: fontName,
                fontObject: fontObject});
        }

        var node = this.tags.fontFamilyTag.replace({fontStyles: fontStyles, fontName: fontName,
            fontObject: fontObject}, infoTip);
        var styleNode = node.getElementsByClassName("infoTipFontFamilyStyle").item(0);

        styleNode.innerHTML = getFontFaceCSS(fontObject ? fontObject : fontName);
        return true;
    }