function(items, request) {
            var count = items.length;
            if (count > 0)
            {
                var output = [];

                for (var i = 0; i < count; i++)
                {
                    var item = this.processItem(items[i]),
                        itemGroup = this.getGroupForItem(item);

                    this.items[this.store.getIdentity(item)] = item;

                    if (itemGroup.tag != this._currentGroup)
                    {
                        if (output.length > 0 && this._currentGroupNode) domConstruct.place(output.join(''), this._currentGroupNode, 'last');

                        output = [];

                        this._currentGroup = itemGroup.tag;
                        domConstruct.place(this.groupTemplate.apply(itemGroup, this), this.contentNode, 'last');
                        this._currentGroupNode = query("> :last-child", this.contentNode)[0];
                    }

                    output.push(this.rowTemplate.apply(item, this));
                }

                if (output.length > 0 && this._currentGroupNode) domConstruct.place(output.join(''), this._currentGroupNode, 'last');
            }

            domClass.remove(this.domNode, 'is-loading');

            /* remove the loading indicator so that it does not get re-shown while requesting more data */
            if (request['start'] === 0) domConstruct.destroy(this.loadingIndicatorNode);

            this.onContentChange();
        }