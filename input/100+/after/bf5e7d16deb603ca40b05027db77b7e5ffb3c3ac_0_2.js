function (opts) {
            var element, select, idKey;

            opts = $.extend({}, {
                formatResult: function (data) { return data.text; },
                formatSelection: function (data) { return data.text; },
                formatNoMatches: function () { return "No matches found"; },
                formatInputTooShort: function (input, min) { return "Please enter " + (min - input.length) + " more characters"; },
                minimumResultsForSearch: 0,
                id: function (e) { return e.id; }
            }, opts);

            if (typeof(opts.id) !== "function") {
                idKey = opts.id;
                opts.id = function (e) { return e[idKey]; }
            }

            element = opts.element;

            if (element.get(0).tagName.toLowerCase() === "select") {
                this.select = select = opts.element;
            }

            // TODO add missing validation logic
            if (select) {
                /*$.each(["multiple", "ajax", "query", "minimumInputLength"], function () {
                 if (this in opts) {
                 throw "Option '" + this + "' is not allowed for Select2 when attached to a select element";
                 }
                 });*/
                this.opts = opts = $.extend({}, {
                    miniumInputLength: 0
                }, opts);
            } else {
                this.opts = opts = $.extend({}, {
                    miniumInputLength: 0
                }, opts);
            }

            if (select) {
                opts.query = this.bind(function (query) {
                    var data = {results: [], more: false},
                        term = query.term.toUpperCase(),
                        placeholder = this.getPlaceholder();
                    element.find("option").each(function (i) {
                        var e = $(this),
                            text = e.text();

                        if (i === 0 && placeholder !== undefined && text === "") return true;

                        if (text.toUpperCase().indexOf(term) >= 0) {
                            data.results.push({id: e.attr("value"), text: text});
                        }
                    });
                    query.callback(data);
                });
                opts.id=function(e) { return e.id; };
            } else {
                if (!("query" in opts)) {
                    if ("ajax" in opts) {
                        opts.query = ajax(opts.ajax);
                    } else if ("data" in opts) {
                        opts.query = local(opts.data);
                    } else if ("tags" in opts) {
                        opts.query = tags(opts.tags);
                        opts.createSearchChoice = function (term) { return {id: term, text: term}; };
                        opts.initSelection = function (element) {
                            var data = [];
                            $(splitVal(element.val(), ",")).each(function () {
                                data.push({id: this, text: this});
                            });
                            return data;
                        };
                    }
                }
            }
            if (typeof(opts.query) !== "function") {
                throw "query function not defined for Select2 " + opts.element.attr("id");
            }

            return opts;
        }