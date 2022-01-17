function(input, selector) {
                var form = input.form;

                if (form == null) {
                    return null;
                }

                var formEls = form.elements,
                    initialInputIndex = $.inArray(input, formEls) + 1,
                    len = formEls.length,
                    $input = null,
                    i;

                // look for next input on the form of the pased input
                for (i = initialInputIndex; i < len; i++) {
                    $input = $(formEls[i]);
                    if (this.__isNextInput($input, selector)) {
                        return $input;
                    }
                }

                var forms = document.forms,
                    initialFormIndex = $.inArray(input.form, forms) + 1,
                    y, tmpFormEls, _len = forms.length;
                // look for the next forms for the next input
                for (y = initialFormIndex; y < _len; y++) {
                    tmpFormEls = forms[y].elements;
                    len = tmpFormEls.length;
                    for (i = 0; i < len; i++) {
                        $input = $(tmpFormEls[i]);
                        if (this.__isNextInput($input, selector)) {
                            return $input;
                        }
                    }
                }
                return null;
            }