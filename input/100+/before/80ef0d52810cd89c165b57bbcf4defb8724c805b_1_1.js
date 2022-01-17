function() {
    this.formulario = $('<form/>', {
      'class': 'form-horizontal' 
    });
    
    var fieldset = $('<fieldset/>');
    fieldset.appendTo( this.formulario );
    
    createFieldFormulario( 'titulo', 'Título' ).appendTo( fieldset );
    createFieldFormulario( 'descricao', 'Descrição' ).appendTo( fieldset );
    createFieldFormulario( 'preco', 'Preço' ).appendTo( fieldset );
    
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