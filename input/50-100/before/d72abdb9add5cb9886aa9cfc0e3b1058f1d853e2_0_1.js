function(){
        var dialog = new MooDialog.Request('/ajax/loginui/', {
            title:'PĹ™ihlĂˇĹˇenĂ­ vyprĹˇelo',
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