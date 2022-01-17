function() {
        return [
            '<div id="' + this.getId('container') + '" class="magic-combobox">',
            '<div id="' + this.getId('input-container') + '" class="magic-combobox-input-container clearfix">',
            '<div class="magic-combobox-input-outter">',
            '<div class="magic-combobox-input-inner">',
            '<input id="' + this.getId('input') + '" class="magic-combobox-input"' + (this._options.readonly ? 'readonly' : '') + '>',
            '</div>',
            '</div>',
            '<a href="#" id="' + this.getId('arrow') + '" class="magic-combobox-arrow" onclick="return false"></a>',
            '</div>',
            '</div>'
        ].join('');
    }