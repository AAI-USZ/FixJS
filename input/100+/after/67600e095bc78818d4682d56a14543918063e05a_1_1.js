function(formatted, callback)
    {
        callback = callback || function() {};
        if (!this.contentLoaded()) {
            this._formatOnLoad = formatted;
            callback();
            return;
        }

        if (this._formatted === formatted) {
            callback();
            return;
        }

        this._formatted = formatted;

        // Re-request content
        this._contentLoaded = false;
        this._content = false;
        WebInspector.UISourceCode.prototype.requestContent.call(this, didGetContent.bind(this));
  
        /**
         * @this {WebInspector.UISourceCode}
         * @param {?string} content
         * @param {boolean} contentEncoded
         * @param {string} mimeType
         */
        function didGetContent(content, contentEncoded, mimeType)
        {
            if (!formatted) {
                this._togglingFormatter = true;
                this.contentChanged(content || "", mimeType);
                delete this._togglingFormatter;
                this._formatterMapping = new WebInspector.IdentityFormatterSourceMapping();
                this.updateLiveLocations();
                callback();
                return;
            }
    
            var formatter = new WebInspector.ScriptFormatter();
            formatter.formatContent(mimeType, content || "", didFormatContent.bind(this));
  
            /**
             * @this {WebInspector.UISourceCode}
             * @param {string} formattedContent
             * @param {WebInspector.FormatterSourceMapping} formatterMapping
             */
            function didFormatContent(formattedContent, formatterMapping)
            {
                this._togglingFormatter = true;
                this.contentChanged(formattedContent, mimeType);
                delete this._togglingFormatter;
                this._formatterMapping = formatterMapping;
                this.updateLiveLocations();
                WebInspector.breakpointManager.restoreBreakpoints(this);
                callback();
            }
        }
    }