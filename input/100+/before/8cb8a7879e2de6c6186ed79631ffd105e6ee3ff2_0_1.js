function() {
        var HTMLString = [];
        HTMLString.push('<div id="' + this.getId('container') + '" class="magic-combobox">');
        HTMLString.push('<div id="' + this.getId('input-container') + '" class="magic-combobox-input-container clearfix">');
        HTMLString.push('<div class="magic-combobox-input-outter">');
        HTMLString.push('<div class="magic-combobox-input-inner">');
        HTMLString.push('<input id="' + this.getId('input') + '" class="magic-combobox-input"' + (this._options.readonly ? 'readonly' : '') + '>');
        HTMLString.push('</div>');
        HTMLString.push('</div>');
        HTMLString.push('<a href="#" id="' + this.getId('arrow') + '" class="magic-combobox-arrow" onclick="return false"></a>');         
        HTMLString.push('</div>');
        HTMLString.push('</div>');
        return HTMLString.join('');
    }