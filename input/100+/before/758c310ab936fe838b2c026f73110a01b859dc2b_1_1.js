function() {
            var defaultValue = this.parent.getDefaultValue() 
            var data = this.parent.toJSON() 
            var config = _.extend(defaultValue, data, {
                max_span : this.parent.getMaxSpan(),                
                style : _.extend(this.styleList, this.getTransformCssFromStyle(data.style), data.style),
                styleTitleList: this.styleTitleList,
                styleValueList: this.styleValueList
            });
            
            config.span_list = this.parent.getSpanList(config.max_span);
            
            return this.getLocalConfig(config);
        }