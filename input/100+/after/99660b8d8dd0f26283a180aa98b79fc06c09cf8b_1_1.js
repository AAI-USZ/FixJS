function(evt, node) {
            var descriptor = node && node.getAttribute('data-descriptor'),
                key = node && node.getAttribute('data-key');
            if (key)
            {
                if (this._selectionModel && this.isNavigationDisabled())
                {
                    this._selectionModel.toggle(key, this.items[key] || descriptor, node);

                    if (this.options.singleSelect && this.options.singleSelectAction)
                    {
                        this.invokeSingleSelectAction();
                    }
                }
                else
                {
                    this.navigateToDetailView(key, descriptor);
                }
            }
        }