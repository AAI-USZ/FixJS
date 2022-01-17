function(data){
        $.each(data, function(){
          $.each(this, function(k, v){
            me.append( new Option(v.name, v.id) )
          });
        });
      }