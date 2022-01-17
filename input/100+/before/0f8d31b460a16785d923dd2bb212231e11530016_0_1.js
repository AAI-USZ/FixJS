function(cols) {
                if (arguments.length) {
                    this._clearfilterInterval();
                    this.deleteAllCSSRules();
                    this._menu.remove();
                    var parentId = this.parent().CSSTableId();
                    for (var i = 0; i < cols.length; i++) {
                        cols[i]["view"] = "DataTableHeaderColumn";
                        var cssRule = this.addCSSRule("div.uki-dataTable" + parentId + " .uki-dataTable-col-" + cols[i].pos);
                        cols[i]["init"] = {
                            pos: cols[i].pos,
                            cssRule: cssRule,
                            filterable: this._filterable,
                            initfocus: cols[i].initfocus
                        };
                    }
                    this._columns = build(cols);
                    this._columns.appendTo(this);
                    this._table.style.width = this.totalWidth() + "px";
                    this._setupFilters();
                    if (this._hasMenu) this._setupMenu();
                    this.trigger({
                        type: "render"
                    });
                }
                return this._columns;
            }