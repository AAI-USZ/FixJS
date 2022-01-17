function(window) {
  var fields = [ {id:"titulo", label:"Título"},
                 {id:"descricao", label:"Descrição"},
                 {id:"preco", label:"Preço" }
               ];
                  
  var ServicoForm;

  // construtor
  ServicoForm = window.ServicoForm = function( labelBotao, functionBotao ) {
    this.label = labelBotao;
    this.action = functionBotao;
  };

  ServicoForm.fn = ServicoForm.prototype;

  ServicoForm.fn.create = function( servico ) {
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
  };
  
  ServicoForm.fn.getServico = function() {
    var formulario = this.formulario;
    var servico = new Servico( this.servico );

    $(formulario).find('input,select,textarea').each(function( index, field ) {
      servico.set( $(field).attr('id'), $(field).val() );
    });
    
    return servico;
  };
  
  var createFieldFormulario = function( idField, labelField, valueField ){
    var field = $( '<div/>', {
      'class': 'control-group'
    });
    
    var label = $( '<label/>', {
      'class': 'control-label',
      'for': idField,
      html: labelField
    });
    label.appendTo( field );
    
    var input = $( '<div/>', {
      'class': 'controls',
      'for': idField,
      html: $('<input/>', {
        'class': 'input-xlarge focused',
        id: idField,
        type: 'text',
        value: valueField!=null ? valueField : 'Digite algo...'
      })
    });
    input.appendTo( field );
    
    return field;
  };
  
}