function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                {
                    xtype: 'feedbackButton',
                    text: 'Give Feedback !',
                    remoteUrl: 'server/sendFeedback.php',
                    flex: 1,
                    id: 'feedback-button',
                    style: {
                        background: 'yellow'
                    },
                    listener: {
                        feedbackSuccess: function(){
                            window.open('data/showFeedback.php');
                        }
                    }
                },
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    }