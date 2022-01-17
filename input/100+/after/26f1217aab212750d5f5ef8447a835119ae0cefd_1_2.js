function() {
                this.linkHolder = new dijit.layout.ContentPane();
                dojo.place(this.linkHolder.domNode, this.domNode, "before");

                if (this.showLoadFilter) {
                    var which_filter_ui = this.filterAlwaysInDiv ?
                        "FlattenerFilterPane" : "FlattenerFilterDialog";

                    dojo.require("openils.widget." + which_filter_ui);
                    this.filterUi =
                        new openils.widget[which_filter_ui]({
                            "fmClass": this.fmClass,
                            "mapTerminii": this.mapTerminii,
                            "useDiv": this.filterAlwaysInDiv,
                            "compact": true,
                            "initializers": this.filterInitializers,
                            "widgetBuilders": this.filterWidgetBuilders
                        });

                    this.filterUi.onApply = dojo.hitch(
                        this, function(filter) {
                            this.filter(
                                dojo.mixin(filter, this._baseQuery),
                                true    /* re-render */
                            );
                        }
                    );

                    this.filterUi.startup();

                    if (this.filterSemaphore && this.filterSemaphore()) {
                        if (this.filterSemaphoreCallback)
                            this.filterSemaphoreCallback();
                    }
                    if (!this.filterAlwaysInDiv) {
                        dojo.create(
                            "a", {
                                "innerHTML": "Filter",  /* XXX i18n */
                                "href": "javascript:void(0);",
                                "onclick": dojo.hitch(this, function() {
                                    this.filterUi.show();
                                })
                            }, this.linkHolder.domNode
                        );
                    }
                }
            }