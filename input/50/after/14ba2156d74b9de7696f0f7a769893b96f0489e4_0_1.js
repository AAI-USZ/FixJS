function(sHtmlId) {
        if(this.oXhr.readyState != 4)
            document.getElementById(sHtmlId).innerHTML = this._getLoadImageHtmlTag();

        return this;
    }