function(superClass) {
            var i, inheritedClass;
            newClass.superClass = superClass;
            if (superClass.hasOwnProperty('__descendants')) {
                superClass.__descendants.push(newClass);
            }
            inheritedClass = function() {
            };
            inheritedClass.prototype = superClass.prototype;
            newClass.prototype = new inheritedClass();
            newClass.prototype.constructor = newClass;

            for (i in superClass) {
                if (superClass.hasOwnProperty(i)
                    && i != 'prototype'
                    && i !== 'className'
                    && i !== 'superClass'
                    && i != '__descendants') {
                    newClass[i] = superClass[i];
                }
            }

            delete this.inherits;
            return this;
        }