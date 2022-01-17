function() {
            this.inherited(arguments);

            var map = {'tbar': 'top', 'bbar': 'bottom'},
                tools = this.get('tools');
            if (tools)
            {
                for (var name in tools)
                {
                    var mapped = map[name] || name;

                    if (this.$[mapped])
                        this.$[mapped].set('items', tools[name]);
                }
            }
        }