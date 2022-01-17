function() {
        this.ifs = [];
        this.client = NMClient.Client.new();
        this.update_iface_list();

        if(!this.ifs.length){
            let net_lines = Shell.get_file_contents_utf8_sync('/proc/net/dev').split("\n");
            for(let i = 2; i < net_lines.length - 1 ; i++) {
                let ifc = net_lines[i].replace(/^\s+/g, '').split(":")[0];
                if(Shell.get_file_contents_utf8_sync('/sys/class/net/' + ifc + '/operstate')
                   .replace(/\s/g, "") == "up" &&
                   ifc.indexOf("br") < 0 &&
                   ifc.indexOf("lo") < 0) {
                    this.ifs.push(ifc);
                }
            }
        }
        this.gtop = new GTop.glibtop_netload();
        this.last = [0, 0, 0, 0, 0];
        this.usage = [0, 0, 0, 0, 0];
        this.last_time = 0;
        this.menu_item = new PopupMenu.PopupMenuItem(_("Net"), {reactive: false});
        this.parent()
        this.tip_format([_('KiB/s'), '/s', _('KiB/s'), '/s', '/s']);
        this.update_units();
        Schema.connect('changed::' + this.elt + '-speed-in-bits', Lang.bind(this, this.update_units));
        try {
            let iface_list = this.client.get_devices();
            this.NMsigID = []
            for(let j = 0; j < iface_list.length; j++) {
                this.NMsigID[j] = iface_list[j].connect('state-changed' , Lang.bind(this, this.update_iface_list));
            }
        }
        catch(e) {
            global.logError("Please install Network Manager Gobject Introspection Bindings: " + e);
        }
        this.update();
    }