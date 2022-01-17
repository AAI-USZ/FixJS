function( servico ) {
    servico = this.servico = servico!=null ? servico : {};
    this.formulario = $('<form/>', {
      'class': 'form-horizontal' 
    });
    
    var fieldset = $('<fieldset/>');
    fieldset.appendTo( this.formulario );
    
    $.each( fields, function(index, field) {
      createFieldFormulario( field.id, field.label, servico[field.id] ).appendTo( fieldset );
    });
    
    var labelBotao = this.label;
    var functionBotao = this.action;
    var container_botao = $( '<div/>', {
      'class': 'form-actions',
      html: $('<button/>', {
        type: 'submit',
        'class': 'btn btn-primary',
        html: labelBotao,
        click: functionBotao
      })
    });
    container_botao.appendTo( fieldset );
    
    return this.formulario;
  }