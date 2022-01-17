function() {
    var formulario = this.formulario;
    var servico = new Servico( this.servico );

    $(formulario).find('input,select,textarea').each(function( index, field ) {
      servico.set( $(field).attr('id'), $(field).val() );
    });
    
    return servico;
  }