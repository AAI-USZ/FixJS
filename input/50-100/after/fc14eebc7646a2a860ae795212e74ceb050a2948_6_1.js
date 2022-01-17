function() {
            this.inherited(arguments);

            var tools = this.get('tools');
            if (tools)
            {
                for (var name in tools)
                {
                    if (this.$[name])
                        this.$[name].set('items', tools[name]);
                }
            }
        }