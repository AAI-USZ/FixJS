function(){
        var dialog = new MooDialog.Request('/ajax/loginui/', {
            title:'PÄąâ„˘ihlÄ‚Ë‡ÄąË‡enÄ‚Â­ vyprÄąË‡elo',
            scroll:true,
            useEscKey:false
        });
        dialog.addEvent('hide', function(){
            if(!this.session)
                location.reload();
            this.session = false;
        });
        dialog.open();
    }