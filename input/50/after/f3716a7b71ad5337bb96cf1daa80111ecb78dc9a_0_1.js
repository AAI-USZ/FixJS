function(entry) {
            this.processEntry(entry);

            if (this.options.changes)
            {
                this.changes = this.options.changes;
                this.setValues(this.changes);
            }
        }