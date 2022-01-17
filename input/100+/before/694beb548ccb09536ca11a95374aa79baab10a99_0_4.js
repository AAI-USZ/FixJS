function(e) {
                    e.preventDefault();
                    var scope = this;
                    // a function used to perform an ajax request
                    function perform_action(e) {
                        var foldername = Y.one('#fm-newname').get('value');
                        if (!foldername) {
                            return;
                        }
                        scope.request({
                            action:'mkdir',
                            params: {filepath:scope.currentpath, newdirname:foldername},
                            callback: function(id, obj, args) {
                                var filepath = obj.filepath;
                                scope.mkdir_dialog.hide();
                                scope.refresh(filepath);
                                Y.one('#fm-newname').set('value', '');
                                if (typeof M.core_formchangechecker != 'undefined') {
                                    M.core_formchangechecker.set_form_changed();
                                }
                            }
                        });
                    }
                    if (!Y.one('#fm-mkdir-dlg')) {
                        var dialog = Y.Node.create('<div id="fm-mkdir-dlg"><div class="hd">'+M.str.repository.entername+'</div><div class="bd"><input type="text" id="fm-newname" /></div></div>');
                        Y.one(document.body).appendChild(dialog);
                        this.mkdir_dialog = new YAHOO.widget.Dialog("fm-mkdir-dlg", {
                             width: "300px",
                             visible: true,
                             x:e.pageX,
                             y:e.pageY,
                             constraintoviewport : true
                             });

                    }
                    var buttons = [ { text:M.str.moodle.ok, handler:perform_action, isDefault:true },
                                  { text:M.str.moodle.cancel, handler:function(){this.cancel();}}];

                    this.mkdir_dialog.cfg.queueProperty("buttons", buttons);
                    this.mkdir_dialog.render();
                    this.mkdir_dialog.show();
                }