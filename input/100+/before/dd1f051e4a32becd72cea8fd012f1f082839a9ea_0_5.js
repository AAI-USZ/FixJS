function(msg, type) {
            var header = M.str.moodle.error;
            if (type != 'error') {
                type = 'info'; // one of only two types excepted
                header = M.str.moodle.info;
            }
            if (!this.msg_dlg) {
                var node = Y.Node.create(M.core_filepicker.templates.message);
                this.fpnode.appendChild(node);

                this.msg_dlg = new Y.Panel({
                    srcNode      : node,
                    zIndex       : 800000,
                    centered     : true,
                    modal        : true,
                    visible      : false,
                    render       : true
                });
                node.one('.fp-msg-butok').on('click', function(e) {
                    e.preventDefault();
                    this.msg_dlg.hide();
                }, this);
            }

            this.msg_dlg.set('headerContent', header);
            this.fpnode.one('.fp-msg').removeClass('fp-msg-info').removeClass('fp-msg-error').addClass('fp-msg-'+type)
            this.fpnode.one('.fp-msg .fp-msg-text').setContent(msg);
            this.msg_dlg.show();
        }