function(layout, item) {
            var rows = typeof layout['children'] === 'function'
                    ? layout['children'].call(this, layout, this._processLayoutRowValue(layout, item), item)
                    : layout['children']
                        ? layout['children']
                        : layout,
                sectionQueue = [],
                sectionStarted = false,
                i, current;

            for (i = 0; i < rows.length; i++) {
                current = rows[i];

                var section,
                    sectionNode,
                    include = this.expandExpression(current['include'], item),
                    exclude = this.expandExpression(current['exclude'], item);

                if (include !== undefined && !include) continue;
                if (exclude !== undefined && exclude) continue;

                if (current['children'])
                {
                    /* todo: do we need to defer anymore? */
                    if (sectionStarted)
                        sectionQueue.push(current);
                    else
                        this._processLayout(current, item);

                    continue;
                }

                if (!sectionStarted)
                {
                    sectionStarted = true;
                    section = domConstruct.toDom(this.sectionTemplate.apply(layout, this));
                    sectionNode = section.lastChild;
                    domConstruct.place(section, this.contentNode);
                }

                this._processLayoutRow(layout, current, item, sectionNode);
            }

            for (i = 0; i < sectionQueue.length; i++)
            {
                current = sectionQueue[i];

                this._processLayout(current, item);
            }
        }