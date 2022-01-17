function()
    {
        ajax.post({
            url: '/gibthon/api/' + this.id + '/saveMeta/', 
            data: {'name': this.name, 'desc': this.desc,}, 
        });
    }