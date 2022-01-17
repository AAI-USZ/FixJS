function(container, results) {
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

                }