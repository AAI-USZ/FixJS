function() {
                var $this = $(this);
                // build autocomplete wrapper
                $this.next().after(loader).after(remove_link($this.attr('id')));
                $this.parent().wrapInner("<div class='grp-autocomplete-wrapper-m2m'></div>");
                //$this.parent().prepend("<ul class='search'><li class='search'><input id='" + $this.attr("id") + "-autocomplete' type='text' class='vTextField' value='' /></li></ul>").prepend("<ul class='repr'></ul>");
                $this.parent().prepend("<ul class='grp-repr'><li class='grp-search'><input id='" + $this.attr("id") + "-autocomplete' type='text' class='vTextField' value='' /></li></ul>");
                // defaults
                options = $.extend({
                    wrapper_autocomplete: $this.parent(),
                    wrapper_repr: $this.parent().find("ul.grp-repr"),
                    wrapper_search: $this.parent().find("li.grp-search"),
                    remove_link: $this.next().next().hide(),
                    loader: $this.next().next().next().hide()
                }, $.fn.grp_autocomplete_m2m.defaults, options);
                // move errorlist outside the wrapper
                if ($this.parent().find("ul.grp-errorlist")) {
                    $this.parent().find("ul.grp-errorlist").detach().appendTo($this.parent().parent());
                }
                // lookup
                lookup_id($this, options);  // lookup when loading page
                lookup_autocomplete($this, options);  // autocomplete-handler
                $this.bind("change focus keyup blur", function() { // id-handler
                    lookup_id($this, options);
                });
                // labels
                $("label[for='"+$this.attr('id')+"']").each(function() {
                    $(this).attr("for", $this.attr("id")+"-autocomplete");
                });
                // click on div > focus input
                options.wrapper_autocomplete.bind("click", function() {
                    options.wrapper_search.find("input:first").focus();
                });
            }