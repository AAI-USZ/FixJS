function updateTree(json) {
        // Grab paths of currently open nodes.
        var openNodes = [];
        jQuery("#otree").find("li.jstree-open").each(function () {
            openNodes.push(this.getAttribute("path"));
        });

        tree.empty();
        tree.jstree({
            plugins     : [ "json_data", "sort", "themes", "types", "cookies", "contextmenu", "ui", "crrm", "dnd"],
            json_data   : { "data": convertJSON(json, '', openNodes) },
            themes      : { "theme":  "classic" },
            cookies     : { "prefix": "objtree", opts : { path : '/' } },
            contextmenu : { "items":  contextMenu },
            crrm        : { "move" : {
                                // don't allow moving within the tree (for now anyway)
                                "check_move" : function (m) {
                                    return false;
                                }
                            }
                          },
            dnd         : { /* drop_check: false means move is invalid, otherwise true */
                            "drop_check" : function (data) {
                                // data.o - the object being dragged
                                // data.r - the drop target
                                //debug.info("ComponentTreeFrame: drop_check:",data);
                                if (data.r.hasClass('WorkflowFigure')) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            },

                            /* drop_target: jquery selector matching all drop targets */
                            "drop_target" : "*",

                            /* drop_finish: executed after a valid drop */
                            "drop_finish" : function (data) {
                                // data.o - the object being dragged
                                // data.r - the drop target
                                debug.info("ComponentTreeFrame: drop_finish:",data);
                                data.e.stopPropagation();
                                if (data.r.hasClass('WorkflowFigure')) {
                                    var component = openmdao.Util.getName(data.o.attr('path')),
                                        pathname  = data.r.data('pathname'),
                                        cmd = pathname+'.workflow.add("'+component+'")';
                                    debug.info(cmd);
                                    model.issueCommand(cmd);
                                }
                            },

                            /* drag_target: jquery selector matching all foreign nodes that can be dropped on the tree */
                            "drag_target" : ".objtype",

                            /* drag_check: */
                            "drag_check" : function (data) {
                                debug.info("ComponentTreeFrame: drag_check:",data);
                                // data.o - the foreign object being dragged
                                // data.r - the hovered node
                                return {
                                    after  : false,
                                    before : false,
                                    inside : false
                                };
                            },

                            /* drag_finish:  executed after a dropping a foreign element on a tree item */
                            "drag_finish" : function (data) {
                                // data.o - the foreign object being dragged
                                // data.r - the target node
                                debug.info("ComponentTreeFrame: drag_finish:",data);
                            }
                          }
        })
        .bind("select_node.jstree", function(e,data) {
            if (typeof select_fn === 'function') {
                var path = data.rslt.obj.attr("path");
                select_fn(path);
            }
        })
        .bind("dblclick.jstree", function (e,data) {
            if (typeof dblclick_fn === 'function') {
                var node = jQuery(e.target).closest("li"),
                    path = node.attr("path");
                dblclick_fn(path);
            }
        });
        // .bind("loaded.jstree", function (e, data) {
            // jQuery('#'+id+' a').draggable({ helper: 'clone', appendTo: 'body' })    // doesn't work ?
        // })
        // .one("reselect.jstree", function (e, data) { });
    }