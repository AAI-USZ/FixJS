function() {
        this.computeValue();
        this.html += '<div';

        if(this.label && this.isGrouped) {
            this.html += ' data-role="fieldcontain"';
        }

        if(this.cssClass) {
            this.html += ' class="' + this.cssClass + '_container"';
        }

        this.html += '>';

        if(this.label) {
            this.html += '<label for="' + (this.name ? this.name : this.id) + '">' + this.label;
            if(this.hasAsteriskOnLabel) {
                if(this.cssClassForAsterisk) {
                    this.html += '<span class="' + this.cssClassForAsterisk + '">*</span></label>';
                } else {
                    this.html += '<span>*</span></label>';
                }
            } else {
                this.html += '</label>';
            }
        }

		// If the device supports placeholders use the HTML5 placeholde attribute else use javascript workarround
        var placeholder = '';
        var initialText = '';
        if(M.Environment.modernizr.inputattributes['placeholder']) {
            placeholder = ' placeholder="' + this.initialText + '" ';

        }else{
            initialText = this.initialText;
        }

        if(this.hasMultipleLines) {
            this.html += '<textarea cols="40" rows="8" name="' + (this.name ? this.name : this.id) + '" id="' + this.id + '"' + this.style() + placeholder + '>' + (this.value ? this.value : initialText) + '</textarea>';
            
        } else {
            var type = this.inputType;
            if(_.include(this.dateInputTypes, this.inputType) && !this.useNativeImplementationIfAvailable || (initialText && this.inputType == M.INPUT_PASSWORD)) {
                type = 'text';
            }
            
            this.html += '<input ' + (this.numberOfChars ? 'maxlength="' + this.numberOfChars + '"' : '') + placeholder + 'type="' + type + '" name="' + (this.name ? this.name : this.id) + '" id="' + this.id + '"' + this.style() + ' value="' + (this.value ? this.value : this.initialText) + '" />';
        }

        this.html += '</div>';

        return this.html;
    }