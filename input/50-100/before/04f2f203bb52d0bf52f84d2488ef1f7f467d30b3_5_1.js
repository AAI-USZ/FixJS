function(value) {
                    var _ = this._;
                    _.reversed = !!value;
                    if (_.reversed && _.phase === 0) {
                        _.phase = Math.max(0, _.buffer.length - 1);
                    }
                }