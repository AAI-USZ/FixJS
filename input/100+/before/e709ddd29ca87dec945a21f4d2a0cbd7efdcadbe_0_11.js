function move(type, ev, obj) {
                var scope = this;
                var itemid = this.options.itemid;
                // setup move file dialog
                var dialog = null;
                if (!Y.one('#fm-move-dlg')) {
                    dialog = Y.Node.create('<div id="fm-move-dlg"></div>');
                    Y.one(document.body).appendChild(dialog);
                } else {
                    dialog = Y.one('#fm-move-dlg');
                }

                dialog.set('innerHTML', '<div class="hd">'+M.str.repository.moving+'</div><div class="bd"><div id="fm-move-div">'+M.str.repository.nopathselected+'</div><div id="fm-tree"></div></div>');

                this.movefile_dialog = new YAHOO.widget.Dialog("fm-move-dlg", {
                     width : "600px",
                     fixedcenter : true,
                     visible : false,
                     constraintoviewport : true
                     });

                var treeview = new YAHOO.widget.TreeView("fm-tree");

                var dialog = this.movefile_dialog;
                function _move(e) {
                    if (!treeview.targetpath) {
                        return;
                    }
                    var params = {};
                    if (fileinfo.type == 'folder') {
                        action = 'movedir';
                    } else {
                        action = 'movefile';
                    }
                    params['filepath'] = fileinfo.filepath;
                    params['filename'] = fileinfo.fullname;
                    params['newfilepath'] = treeview.targetpath;
                    scope.request({
                        action: action,
                        scope: scope,
                        params: params,
                        callback: function(id, obj, args) {
                            var p = '/';
                            if (obj) {
                                p = obj.filepath;
                            }
                            dialog.cancel();
                            scope.refresh(p);
                            if (typeof M.core_formchangechecker != 'undefined') {
                                M.core_formchangechecker.set_form_changed();
                            }
                        }
                    });
                }

                var buttons = [ { text:M.str.moodle.move, handler:_move, isDefault:true },
                                  { text:M.str.moodle.cancel, handler:function(){this.cancel();}}];

                this.movefile_dialog.cfg.queueProperty("buttons", buttons);
                this.movefile_dialog.render();

                treeview.subscribe("dblClickEvent", function(e) {
                    // update destidatoin folder
                    this.targetpath = e.node.data.path;
                    var title = Y.one('#fm-move-div');
                    title.set('innerHTML', '<strong>"' + this.targetpath + '"</strong> has been selected.');
                });

                function loadDataForNode(node, onCompleteCallback) {
                    var params = {};
                    params['filepath'] = node.data.path;
                    var obj = {
                        action: 'dir',
                        scope: scope,
                        params: params,
                        callback: function(id, obj, args) {
                            data = obj.children;
                            if (data.length == 0) {
                                // so it is empty
                            } else {
                                for (var i in data) {
                                    var textnode = {label: data[i].fullname, path: data[i].filepath, itemid: this.itemid};
                                    var tmpNode = new YAHOO.widget.TextNode(textnode, node, false);
                                }
                            }
                            this.oncomplete();
                        }
                    };
                    obj.oncomplete = onCompleteCallback;
                    scope.request(obj);
                }

                this.movefile_dialog.subscribe('show', function(){
                    var rootNode = treeview.getRoot();
                    treeview.setDynamicLoad(loadDataForNode);
                    treeview.removeChildren(rootNode);
                    var textnode = {label: M.str.moodle.files, path: '/'};
                    var tmpNode = new YAHOO.widget.TextNode(textnode, rootNode, true);
                    treeview.draw();
                }, this, true);

                this.movefile_dialog.show();
            }