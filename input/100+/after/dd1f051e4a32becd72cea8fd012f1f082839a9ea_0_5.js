function(msg, type) {
            var header = M.str.moodle.error;
            if (type != 'error') {
                type = 'info'; // one of only two types excepted
                header = M.str.moodle.info;
            }
            if (!this.msg_dlg) {
                this.msg_dlg_node = Y.Node.create(M.core_filepicker.templates.message);
                this.msg_dlg_node.generateID();
                Y.one(document.body).appendChild(this.msg_dlg_node);

                this.msg_dlg = new Y.Panel({
                    srcNode      : this.msg_dlg_node,
                    zIndex       : 800000,
                    centered     : true,
                    modal        : true,
                    visible      : false,
                    render       : true
                });
                this.msg_dlg.plug(Y.Plugin.Drag,{handles:['#'+this.msg_dlg_node.get('id')+' .yui3-widget-hd']});
                this.msg_dlg_node.one('.fp-msg-butok').on('click', function(e) {
                    e.preventDefault();
                    this.msg_dlg.hide();
                }, this);
            }

            this.msg_dlg.set('headerContent', header);
            this.msg_dlg_node.removeClass('fp-msg-info').removeClass('fp-msg-error').addClass('fp-msg-'+type)
            this.msg_dlg_node.one('.fp-msg-text').setContent(msg);
            this.msg_dlg.show();
        }