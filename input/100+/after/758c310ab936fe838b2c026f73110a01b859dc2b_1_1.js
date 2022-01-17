function() {
            var defaultValue = this.parent.getDefaultValue() 
            var data = this.parent.toJSON() 
            var config = _.extend(defaultValue, data, {
                max_span : this.parent.getMaxSpan()
            });
            
            config.span_list = this.parent.getSpanList(config.max_span);
            
            return this.getLocalConfig(config);
        }