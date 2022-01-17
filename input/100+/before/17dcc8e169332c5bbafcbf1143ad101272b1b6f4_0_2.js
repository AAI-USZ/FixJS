function( callback ) {
        var url= BASE_URL+'tt/'+self.json_param.username+'/histo/'+self.json_param.cat+'/'+self.json_param.id+'/'+self.json_param.datefrom+'_'+self.json_param.dateto+'/'+self.json_param.groupby+'.json';
        $.getJSON(url, function(data) {  self.data=data; callback()   });
    }