function(infoTip, target, x, y)
    {
        var row = Dom.getAncestorByClass(target, "netRow");
        if (row && row.repObject)
        {
            if (Dom.getAncestorByClass(target, "netTotalSizeCol"))
            {
                var infoTipURL = "netTotalSize";
                if (infoTipURL == this.infoTipURL)
                    return true;

                this.infoTipURL = infoTipURL;
                return this.populateTotalSizeInfoTip(infoTip, row);
            }
            else if (Dom.getAncestorByClass(target, "netSizeCol"))
            {
                var infoTipURL = row.repObject.href + "-netsize";
                if (infoTipURL == this.infoTipURL && row.repObject == this.infoTipFile)
                    return true;

                this.infoTipURL = infoTipURL;
                this.infoTipFile = row.repObject;
                return this.populateSizeInfoTip(infoTip, row.repObject);
            }
            else if (Dom.getAncestorByClass(target, "netTimeCol"))
            {
                var infoTipURL = row.repObject.href + "-nettime";
                if (infoTipURL == this.infoTipURL && row.repObject == this.infoTipFile)
                    return true;

                this.infoTipURL = infoTipURL;
                this.infoTipFile = row.repObject;
                return this.populateTimeInfoTip(infoTip, row.repObject);
            }
            else if (Css.hasClass(row, "category-image") &&
                !Dom.getAncestorByClass(target, "netRowHeader"))
            {
                var infoTipURL = row.repObject.href + "-image";
                if (infoTipURL == this.infoTipURL)
                    return true;

                this.infoTipURL = infoTipURL;
                return Firebug.InfoTip.populateImageInfoTip(infoTip, row.repObject.href);
            }
        }

        delete this.infoTipURL;
        return false;
    }