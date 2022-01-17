function(results, depth) {

                        var i, l, uid, result, selectable, compound;
                        for (i = 0, l = results.length; i < l; i = i + 1) {

                            result=results[i];
                            selectable=id(result) !== undefined;
                            compound=("children" in result) && result.children.length > 0;

                            markup.push("<li class='select2-result-depth-" + depth);
                            markup.push(" select2-result");
                            markup.push(selectable ? " select2-result-selectable" : " select2-result-unselectable");
                            if (compound) { markup.push(" select2-result-with-children"); }

                            markup.push("'");

                            uid=nextUid();
                            markup.push(" id='select2-result-"+uid+"'");
                            uidToData[uid]=result;

                            markup.push("><div class='select2-result-label'>");
                            formatted=opts.formatResult(result, query, markup);
                            // for backwards compat with <3.0 versions
                            if (formatted!==undefined) {
                                markup.push(formatted);
                            }
                            markup.push("</div>");

                            if (compound) {
                                markup.push("<ul class='select2-result-sub'>");
                                populate(result.children, depth + 1);
                                markup.push("</ul>");
                            }

                            markup.push("</li>");
                        }
                    }