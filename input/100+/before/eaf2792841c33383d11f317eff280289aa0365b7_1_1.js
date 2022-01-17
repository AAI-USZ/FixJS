function(items, request) {
            var store = this.get('store'),
                count = items.length;
            if (count > 0)
            {
                var output = [];

                for (var i = 0; i < count; i++)
                {
                    var item = this.processItem(items[i]);

                    this.items[store.getIdentity(item)] = item;

                    output.push(this.rowTemplate.apply(item, this));
                }

                if (output.length > 0) domConstruct.place(output.join(''), this.contentNode, 'last');
            }

            domClass.remove(this.domNode, 'is-loading');

            /* remove the loading indicator so that it does not get re-shown while requesting more data */
            if (request['start'] === 0) domConstruct.destroy(this.loadingIndicatorNode);

            var self = this;
            setTimeout(function() { self.onContentChange(); }, 100);
        }