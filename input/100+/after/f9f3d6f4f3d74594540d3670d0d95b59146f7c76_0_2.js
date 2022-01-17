function (opts) {
            var element, select, idKey;
            
            element = opts.element;

            if (element.get(0).tagName.toLowerCase() === "select") {
                this.select = select = opts.element;
            }

            if (select) {
                // these options are not allowed when attached to a select because they are picked up off the element itself
                $.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                    if (this in opts) {
                        throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
                    }
                });
            }

            opts = $.extend({}, {
                containerCss: {},
                dropdownCss: {},
                populateResults: function(container, results) {
                    var uidToData={}, populate, markup=[], uid, data, result, children;

                    populate=function(results, depth) {

                        var i, l, uid, result, selectable, compound;
                        for (i = 0, l = results.length; i < l; i = i + 1) {

                            result=results[i];
                            selectable=("id" in result); // TODO switch to id() function
                            compound=("children" in result) && result.children.length > 0;

                            markup.push("<li class='select2-result-depth-"+depth);
                            if (!selectable) { markup.push(" select2-result-unselectable"); } else { markup.push(" select2-result");}
                            if (compound) { markup.push(" select2-result-with-children"); }

                            markup.push("'");

                            if (selectable) {
                                uid=nextUid();
                                markup.push(" id='select2-result-"+uid+"'");
                                uidToData[uid]=result;
                            }

                            markup.push("><div class='select2-result-label'>"+opts.formatResult(result)+"</div>");

                            if (compound) {
                                markup.push("<ul class='select2-result-sub'>");
                                populate(result.children, depth + 1);
                                markup.push("</ul>");
                            }

                            markup.push("</li>");
                        }
                    };

                    populate(results, 0);

                    children=container.children();
                    if (children.length===0) {
                        container.html(markup.join(""));
                    } else {
                        $(children[children.length-1]).append(markup.join(""));
                    }

                    for (uid in uidToData) {
                        $("#select2-result-"+uid, container).data("select2-data", uidToData[uid]);
                    }

                },
                formatResult: function(result) {
                     return result.text;
                },
                formatSelection: function (data) {
                    return data.fullText || data.text;
                },
                formatNoMatches: function () { return "No matches found"; },
                formatInputTooShort: function (input, min) { return "Please enter " + (min - input.length) + " more characters"; },
                formatLoadMore: function (pageNumber) { return "Loading more results..."; },
                minimumResultsForSearch: 0,
                minimumInputLength: 0,
                id: function (e) { return e.id; },
                matcher: function(term, text) {
                    return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
                }
            }, opts);

            if (typeof(opts.id) !== "function") {
                idKey = opts.id;
                opts.id = function (e) { return e[idKey]; };
            }

            if (select) {
                opts.query = this.bind(function (query) {
                    var data = { results: [], more: false },
                        term = query.term,
                        children, firstChild, process;

                    process=function(element, collection) {
                        var group;
                        if (element.is("option")) {
                            if (query.matcher(term, element.text())) {
                                collection.push({id:element.attr("value"), text:element.text()});
                            }
                        } else if (element.is("optgroup")) {
                            group={text:element.attr("label"), children:[]};
                            element.children().each2(function(i, elm) { process(elm, group.children); });
                            if (group.children.length>0) {
                                collection.push(group);
                            }
                        }
                    };

                    children=element.children();

                    // ignore the placeholder option if there is one
                    if (this.getPlaceholder() !== undefined && children.length > 0) {
                        firstChild = children[0];
                        if ($(firstChild).text() === "") {
                            children=children.not(firstChild);
                        }
                    }

                    children.each2(function(i, elm) { process(elm, data.results); });

                    query.callback(data);
                });
                // this is needed because inside val() we construct choices from options and there id is hardcoded
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