function() {
                if(angular.isString(ngModel.$viewValue)) {
                    codemirror.setValue(ngModel.$viewValue);
                } else {
                    // momentarily stub out the change handler.  we want to keep the model
                    // value, but CodeMirror wants a string, so we pass it an empty string
                    // and keep the model the same.
                    var changeHandler = codemirror.getOption('onChange');
                    codemirror.setOption('onChange', angular.noop);
                    codemirror.setValue('');
                    codemirror.setOption('onChange', changeHandler);
                }
            }