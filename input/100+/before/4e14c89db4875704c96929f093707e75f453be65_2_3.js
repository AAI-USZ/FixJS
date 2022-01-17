function(defaultValue) {
                var defLen = defaultValue.length,
                    thisLen = this.length,
                    i;
                //removes the leading chars
                for (i = thisLen-1; i >= 0; i--) {
                    if (this[i] == defaultValue.charAt(0)) this.pop();
                    else break;
                }
                // apply the default value
                for (i = 0; i < defLen; i++) if (!this[i])
                    this[i] = defaultValue.charAt(i);

                return this;
            }