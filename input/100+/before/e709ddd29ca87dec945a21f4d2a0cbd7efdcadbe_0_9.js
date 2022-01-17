function rename (type, ev, obj) {
                var scope = this;
                var perform = function(e) {
                    var newfilename = Y.one('#fm-rename-input').get('value');
                    if (!newfilename) {
                        return;
                    }

                    var action = '';
                    var params = {};
                    if (fileinfo.type == 'folder') {
                        params['filepath']   = fileinfo.filepath;
                        params['filename']   = '.';
                        params['newdirname'] = newfilename;
                        action = 'renamedir';
                    } else {
                        params['filepath']   = fileinfo.filepath;
                        params['filename']   = fileinfo.fullname;
                        params['newfilename'] = newfilename;
                        action = 'rename';
                    }
                    scope.request({
                        action: action,
                        scope: scope,
                        params: params,
                        callback: function(id, obj, args) {
                            if (obj == false) {
                                alert(M.str.repository.fileexists);
                            } else {
                                scope.refresh(obj.filepath);
                                if (typeof M.core_formchangechecker != 'undefined') {
                                    M.core_formchangechecker.set_form_changed();
                                }
                            }
                            Y.one('#fm-rename-input').set('value', '');
                            scope.rename_dialog.hide();
                        }
                    });
                };

                var dialog = Y.one('#fm-rename-dlg');
                if (!dialog) {
                    dialog = Y.Node.create('<div id="fm-rename-dlg"><div class="hd">'+M.str.repository.enternewname+'</div><div class="bd"><input type="text" id="fm-rename-input" /></div></div>');
                    Y.one(document.body).appendChild(dialog);
                    this.rename_dialog = new YAHOO.widget.Dialog("fm-rename-dlg", {
                         width: "300px",
                         fixedcenter: true,
                         visible: true,
                         constraintoviewport : true
                         });

                }
                var buttons = [ { text:M.str.moodle.rename, handler:perform, isDefault:true},
                                  { text:M.str.moodle.cancel, handler:function(){this.cancel();}}];

                this.rename_dialog.cfg.queueProperty('buttons', buttons);
                this.rename_dialog.render();
                this.rename_dialog.show();
                //var k1 = new YAHOO.util.KeyListener(scope, {keys:13}, {fn:function(){perform();}, correctScope: true});
                //k1.enable();
                Y.one('#fm-rename-input').set('value', fileinfo.fullname);
            }