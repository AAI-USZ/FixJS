function(expression, value) {
            if (null !== this.data.having) {
                this.data.having += ' and ';
            } else {
                this.data.having = '';
            }

            // handle replacing multiple values
            if ('array' === joli.getType(value)) {
                var i = 0;

                // replace question marks one at a time from the array
                while (expression.indexOf('?') !== -1 && value[i] !== undefined) {
                    expression = expression.replace(/\?/i, '"' + value[i] + '"');
                    i++;
                }

                this.data.having += expression;
            } else {
                this.data.having += expression.replace(/\?/gi, '"' + value + '"');
            }

            return this;
        }