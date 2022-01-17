function( callback ){
    
    var instanceOfServico = this;
    $.ajax({
      url: url_salvar,
      type: "POST",
      data: $.toJSON(instanceOfServico),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        callback( data );
      },
      complete: function(){
        
      },
      error: function(error){
        alert( "Erro!" );
      }
    });
    
  }