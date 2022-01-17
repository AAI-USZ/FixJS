function($label) {
                        // For autosuggest clearing, since we have to put the error on the ul instead of the element
                        if (insertAfterLabel && $label.next('ul.as-selections').length) {
                            $label.next('ul.as-selections').removeClass('s3d-error');
                        } else if ($label.prev('ul.as-selections').length) {
                            $label.prev('ul.as-selections').removeClass('s3d-error');
                        }
                        $label.remove();
                        if ($.isFunction(successCallback)) {
                            successCallback($label);
                        }
                    }