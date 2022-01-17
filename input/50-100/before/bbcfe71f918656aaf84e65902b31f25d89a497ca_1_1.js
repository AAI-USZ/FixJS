function(cfids, dirs, _suc)
    {
        AJAX.post({
            url: '/gibthon/api/' + this.id + '/saveOrder/', 
            data: {'d[]': {'cfid':cfids, 'direction':dirs,},},
            success: function() {if(_suc!=undefined) _suc();},
        });
    }