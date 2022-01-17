function(sHtmlId) {
        if(this.readyState != 4)
            document.getElementById(sHtmlId).innerHTML = this._getLoadImageHtmlTag();

        return this;
    }