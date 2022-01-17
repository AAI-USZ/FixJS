function(n) {
        var a = n.attributes;
        var ui = n.getUI();
        var m = [];
        
        m.push({
            text: '<b>'+a.text+'</b>'
            ,handler: function() { return false; }
            ,header: true
        });
        m.push('-');
        
        if (ui.hasClass('pedit')) {
            m.push({
                text: _('edit_'+a.type)
                ,type: a.type
                ,pk: a.pk
                ,handler: function(itm,e) {
                    location.href = 'index.php?a='
                        + MODx.action['element/'+itm.type+'/update']
                        + '&id='+itm.pk;
                }
            });
            m.push({
                text: _('quick_update_'+a.type)
                ,type: a.type
                ,handler: function(itm,e) {
                    this.quickUpdate(itm,e,itm.type);
                }
            });
            if (a.classKey == 'modPlugin') {
                if (a.active) {
                    m.push({
                        text: _('plugin_deactivate')
                        ,type: a.type
                        ,handler: this.deactivatePlugin
                    });
                } else {
                    m.push({
                        text: _('plugin_activate')
                        ,type: a.type
                        ,handler: this.activatePlugin
                    });
                }
            }
        }
        if (ui.hasClass('pnew')) {
            m.push({
                text: _('duplicate_'+a.type)
                ,pk: a.pk
                ,type: a.type
                ,handler: function(itm,e) {
                    this.duplicateElement(itm,e,itm.pk,itm.type);
                }
            });
        }
        if (ui.hasClass('pdelete')) {
            m.push({
                text: _('remove_'+a.type)
                ,handler: this.removeElement
            });
        }
        m.push('-');
        if (ui.hasClass('pnew')) {
            m.push({
                text: _('add_to_category_'+a.type)
                ,handler: this._createElement
            });
        }
        if (ui.hasClass('pnewcat')) {
            m.push({
                text: _('new_category')
                ,handler: this.createCategory
            });
        }
        return m;
    }