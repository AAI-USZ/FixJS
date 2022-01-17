function() {
                this.linkHolder = new dijit.layout.ContentPane();
                dojo.place(this.linkHolder.domNode, this.domNode, "before");

                if (this.showLoadFilter) {
                    dojo.require("openils.widget.FlattenerFilterDialog");
                    this.filterDialog =
                        new openils.widget.FlattenerFilterDialog({
                            "fmClass": this.fmClass,
                            "mapTerminii": this.mapTerminii
                        });

                    this.filterDialog.onApply = dojo.hitch(
                        this, function(filter) {
                            this.filter(
                                dojo.mixin(filter, this._baseQuery),
                                true    /* re-render */
                            );
                        }
                    );

                    this.filterDialog.startup();
                    dojo.create(
                        "a", {
                            "innerHTML": "Filter",  /* XXX i18n */
                            "href": "javascript:void(0);",
                            "onclick": dojo.hitch(this, function() {
                                this.filterDialog.show();
                            })
                        }, this.linkHolder.domNode
                    );
                }
            }