function(msg, type) {
            var client_id = this.options.client_id;
            var dlg_id = 'fp-msg-dlg-'+client_id;
            function handleYes() {
                this.hide();
            }
            var icon = YAHOO.widget.SimpleDialog.ICON_INFO;
            if (type=='error') {
                icon = YAHOO.widget.SimpleDialog.ICON_ALARM;
            }
            if (!this.msg_dlg) {
                this.msg_dlg = new YAHOO.widget.SimpleDialog(dlg_id,
                     { width: "300px",
                       fixedcenter: true,
                       visible: true,
                       draggable: true,
                       close: true,
                       text: msg,
                       modal: false,
                       icon: icon,
                       zindex: 9999992,
                       constraintoviewport: true,
                       buttons: [{ text:M.str.moodle.ok, handler:handleYes, isDefault:true }]
                     });
                this.msg_dlg.render(document.body);
            } else {
                this.msg_dlg.setBody(msg);
            }
            var header = M.str.moodle.info;
            if (type=='error') {
                header = M.str.moodle.error;
            }
            this.msg_dlg.setHeader(header);
            this.msg_dlg.show();
        }