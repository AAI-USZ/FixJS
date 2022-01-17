function() {
    var formulario = this.formulario;
    var servico = new Servico();

    $(formulario).find('input,select,textarea').each(function( index, field ) {
      servico.set( $(field).attr('id'), $(field).val() );
    });
    
    return servico;
  }