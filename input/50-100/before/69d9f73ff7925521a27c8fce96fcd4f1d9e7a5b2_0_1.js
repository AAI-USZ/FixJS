function(option, value) {
            if (value != null) {
                switch(option) {
                    case "hidden":
                    if (value)
                        this.uiChatbox.hide();
                    else
                        this.uiChatbox.show();

                        break;
                
                    case "offset":
                        this._position(value);
                        break;
                
                    case "width":
                        this._setWidth(value);
                        break;
                }
            }

            $.Widget.prototype._setOption.apply(this, arguments);
        }