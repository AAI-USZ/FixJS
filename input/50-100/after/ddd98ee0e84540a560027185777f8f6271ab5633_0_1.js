function(value) {
                if(angular.isUndefined(value) || value === null) {
                    return '';
                }
                else if (angular.isObject(value) || angular.isArray(value)) {
                    throw new Error('ui-codemirror cannot use an object or an array as a model');
                }
                return value;
            }