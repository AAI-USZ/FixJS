function(input, selector) {
                var formEls = input.form.elements,
                    initialInputIndex = $.inArray(input, formEls) + 1,
                    $input = null,
                    i;
                // look for next input on the form of the pased input
                for (i = initialInputIndex; i < formEls.length; i++) {
                    $input = $(formEls[i]);
                    if (this.__isNextInput($input, selector))
                        return $input;
                }

                var forms = document.forms,
                    initialFormIndex = $.inArray(input.form, forms) + 1,
                    y, tmpFormEls = null;
                // look for the next forms for the next input
                for (y = initialFormIndex; y < forms.length; y++) {
                    tmpFormEls = forms[y].elements;
                    for (i = 0; i < tmpFormEls.length; i++) {
                        $input = $(tmpFormEls[i]);
                        if (this.__isNextInput($input, selector))
                            return $input;
                    }
                }
                return null;
            }