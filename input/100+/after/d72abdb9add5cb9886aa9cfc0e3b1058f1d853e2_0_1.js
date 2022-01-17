function(res, tree){
            console.log(res);
            var win = new mBox.Modal.Confirm({
                title:'Potvrdit platbu',
                overlay: true,
                overlayStyles: {
                    color: 'white',
                    opacity: 0.8
                },
                overlayFadeDuration: 50,
                content: 'Akce: ' + tree[1].get('text') + '<br/>Cena: ' + tree[2].get('text') + '&yen;<br/>',
                buttons:[
                    { title: 'ZruÄąË‡it' },
                    { 
                        title: 'Potvrdit platbu',
                        event: function() {
                            AC.ajax(params.task, params.prm, params.cb, params.method)
                            win.close();
                        }
                    }
                ]
            });
            win.open();
        }