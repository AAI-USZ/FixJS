function( callback ) {
        if (self.json_param.categorie==null) self.json_param.categorie='all';
        var url= BASE_URL+'tt/'+self.json_param.username+'/histo/'+self.json_param.categorie+'/'+self.json_param.datefrom+'/'+self.json_param.dateto+'/'+self.json_param.groupby+'.json';
        if (self.json_param.tags!=null) url+='?tags='+self.json_param.tags;

        $.getJSON(url, function(data) {  self.data=data; callback()   });
    }