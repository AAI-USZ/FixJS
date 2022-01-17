function(btn, event, opts) {
        Ext.Viewport.getActiveItem().destroy();

        // associates the program selected with the user model
        // (we need this to fetch the program catalog)
        var store = Ext.getStore('User');
        var user = store.first();
        user.setProgram(this.id);
        store.sync();

        if (user.get('role') === 'onsite') {

            // retrieves the list of users
            var studentStore = Ext.getStore('Students'),
                studentListUrl = LU.Util.getStudentListUrl();

            studentStore.setProxy({
                type: 'ajax',
                url: studentListUrl
            });
            studentStore.load();

            Ext.Viewport.setActiveItem(Ext.widget('onsite'));
        } else if (user.get('role') === 'student') {
            Ext.Viewport.setMasked({ xtype: 'loadmask' });

            LU.Util.getClasses(function(result) {
                if (!result) {
                    Ext.Viewport.setActiveItem(Ext.widget('student'));
                    Ext.Viewport.setMasked(false);
                } else {
                    Ext.Msg.alert('Network Error', 'We are experiencing problems fetching the data from server. You may wish to try reloading again.');
                }
            });
        }
    }