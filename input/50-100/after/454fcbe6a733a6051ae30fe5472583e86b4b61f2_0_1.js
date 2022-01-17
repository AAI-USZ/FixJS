function(){
        var me = this,
            previewPanel = me.query('[action="labPreviewPanel"]')[0];
        me.uploadWin.show();
        me.uploadWin.alignTo(previewPanel.el.dom,'tr-tr',[-5,30])
    }