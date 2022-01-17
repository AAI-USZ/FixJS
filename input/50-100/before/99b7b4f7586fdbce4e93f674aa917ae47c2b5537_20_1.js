function () {
        lab_num++;
        var endOfForm = 6;
        this.getLabOrderForm().insert(endOfForm, {
            xtype: 'labStore',
            id: 'lab' + lab_num,
            width: '350px',
            height: '70px'
        });
    }