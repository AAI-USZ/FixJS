function (records, operation, success) {
                // the operation object contains all of the details of the load operation
                Ext.getCmp('1').setHtml("");
                Ext.getCmp('2').setHtml("");
                Ext.getCmp('3').setHtml("");
                Ext.getCmp('4').setHtml("");
                Ext.getCmp('5').setHtml("");
                Ext.getCmp('1').setHtml(store.last().raw.obs[0].display);
                Ext.getCmp('2').setHtml(store.last().raw.obs[1].display);
                Ext.getCmp('3').setHtml(store.last().raw.obs[2].display);
                Ext.getCmp('4').setHtml(store.last().raw.obs[3].display);
                Ext.getCmp('5').setHtml(store.last().raw.obs[4].display);
            }