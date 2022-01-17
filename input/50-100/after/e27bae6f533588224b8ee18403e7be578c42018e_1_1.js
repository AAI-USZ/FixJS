function () {
        if (!this.isNew) {
            this.warDelWin=this.getView('warranty.Delete').create();
            this.warDelWin.getComponent('nb-war-del-win-container')
                                .getComponent('nb-war-del-win-message')
                                    .update('Удалить заказ №'+Ext.getCmp('nb-war-id').getValue()+' ?');            
            this.warDelWin.show();
        }
        else {
            Ext.Msg.alert('Сообщение','Удалить можно только сохраненный заказ');
        }        
    }