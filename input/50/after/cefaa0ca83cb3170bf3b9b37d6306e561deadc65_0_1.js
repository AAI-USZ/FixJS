function addTodoWithPrefix( prefix, msg ){
  if ( msg == "" ){
    return;
  }

  var prefix_text = "";
  if ( prefix != "" ){
    prefix_text = "[" + prefix + "]";
  }

  addTodoAjax( prefix_text + " " + msg );
}