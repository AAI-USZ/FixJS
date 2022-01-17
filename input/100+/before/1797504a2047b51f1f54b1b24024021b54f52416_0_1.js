function() {
            var startTime = new Date();
            var i, model, newRow, attachTbodyToTable = false,
                options = this.options,
                rowWidgetClass = options.rowWidgetClass,
                models = options.models,
                len = models.length,
                rows = options.rows,
                rowsLen = rows.length,
                $tbody = this.$tbody,
                tbody = $tbody[0],
                selectedModel = null;

            // track what was highlighted ONLY IF it's not being tracked in the
            // models, i.e. this.options.highlightableGridModelField is null
            if (this._highlighted && options.highlightableGridModelField == null) {
                selectedModel = this._highlighted.options.model;
            }
                        
            if (this._shouldFullyRender()) {
                $tbody.remove();
                $tbody = this.$tbody = $('<tbody></tbody>');
                options.rows = rows = [];
                rowsLen = 0;
                attachTbodyToTable = true;
            }
            
            if (this._sortedColumn){
                models = models.sort(this._compare(this._sortedColumn.name, this._sortedColumn.order));
            }
            
            if (options.highlightableGridModelField == null) {
                this.unhighlight();
            }
            
            for (i = 0; i < len; i++) {
                model = models[i];
                if (i >= rowsLen) {
                    newRow = this.makeRow(model, i);
                    $tbody.__append__(newRow.node);
                    rows.push(newRow);
                } else {
                    this.setModel(rows[i], model);
                }
                
                // if the highlighted row is NOT being tracked at the model
                // level (only being tracked by the grid), then highlight the
                // row
                if (selectedModel && model === selectedModel) {
                    this.highlight(rows[i]);

                // if the highlighted row IS being tracked at the model level,
                // then use that to set the highlight
                } else if (options.highlightableGridModelField &&
                           model[options.highlightableGridModelField]) {
                    this.highlight(rows[i]);
                }
            }

            // in the case where we've removed models, remove the corresponding
            // rows
            for (; i < rowsLen; i++) {
                tbody.removeChild(rows[i].node);
            }
            if (rowsLen > len) {
                rows.remove(len, rowsLen);
            }

            if (attachTbodyToTable) {
                this.$table.__append__($tbody);
            }
            console.log('render time for',this.id,':',new Date() - startTime);
        }