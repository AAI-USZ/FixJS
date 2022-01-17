function(filterConfig) {
               // Handles processing of option filters. Expects the following ids
                // in the DOM:
                //
                //  * #form-{name} - the form that wraps the filter's select field.
                //  * #clear-filter-{name} - the element that is used to clear the filter.
                //  * #{name} - the element that has the value of the filter.
                var name = filterConfig.name;
                var noneSelectedText = filterConfig.noneSelectedText;
                var selectedText = filterConfig.selectedText;
                var ajaxPopulate = filterConfig.ajax;
                var finishInit = function() {
                    jQuery("#f-" + name).multiselect({
                            noneSelectedText: noneSelectedText,
                            classes: name + "-ms",
                            selectedText: selectedText,
                            selectedList: 10,
                            minWidth: "auto"
                    }).multiselectfilter();
                        
                    var updateFilter = function(event, ui) {
                        PNWMOTHS.Filters.filters[name] = jQuery(this).multiselect("getChecked").map(function() { return this.value; });
                        if (PNWMOTHS.Filters.filters[name].length == 0)
                                delete PNWMOTHS.Filters.filters[name];
                        jQuery(document).trigger("requestData");
                    };
				
                    jQuery("#f-" + name).bind("multiselectclick", updateFilter);
                    jQuery("#f-" + name).bind("multiselectcheckall", updateFilter);
                    jQuery("#f-" + name).bind("multiselectuncheckall", updateFilter);
                };

                return {
                initialize: function () {
                    if(!ajaxPopulate) {
                        finishInit();
                    }
                    return jQuery("#f-" + name);
                },
                ajaxPopulate: ajaxPopulate,
                populate: function (event, data) {
					jQuery(this).unbind(event);
                    // Builds an option filter's options given a set of data.
                    var select = jQuery("#f-" + name),
                        option, i;
                    for (i in data) {
                        if (data.hasOwnProperty(i)) {
                            option = jQuery("<option></option>");
                            option.val(data[i]);
                            option.text(data[i]);
                            select.append(option);
                        }
                    }
                    
                    finishInit();
                    
                    return select;
                },
                reset: function(filter_delete) {
                    if (jQuery("#f-" + name).multiselect("getChecked").length)
                        jQuery("#f-" + name).multiselect("uncheckAll");
               }
            };            
        }