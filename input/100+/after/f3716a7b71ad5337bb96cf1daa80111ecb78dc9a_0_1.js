function() {
            this.entry = false;
            this.changes = false;
            this.inserting = (this.options.insert === true);

            domClass.remove(this.domNode, 'panel-form-error');

            this.clearValues();

            if (this.inserting)
            {
                if (this.options.template)
                    this.processTemplateEntry(this.options.template);
                else
                    this.requestTemplate();
            }
            else
            {
                // apply entry as non-modified data
                if (this.options.entry)
                {
                    this.processEntry(this.options.entry);

                    // apply changes as modified data, since we want this to feed-back through
                    if (this.options.changes)
                    {
                        this.changes = this.options.changes;
                        this.setValues(this.changes);
                    }
                }
                else
                {
                    // if key is passed request that keys entity and process
                    if (this.options.key)
                        this.requestData();
                }
            }
        }