function(){
  var me = $("#work_unit_client_id");
  me.children().remove();
  me.append( new Option("Select a client","") )
  $("#work_unit_project_id").children().remove();
  $("#work_unit_project_id").append( new Option("Select a project",""))
  $("#work_unit_ticket_id").children().remove();
  $("#work_unit_ticket_id").append( new Option("Select a ticket",""))

  if(this.checked) {
    this.value = 1
    $.get("/dashboard/collaborative_index", { id: this.value }, function(data){
      $.each(data, function(){
        $.each(this, function(k, v){
          me.append( new Option(v.name, v.id) )
        });
      });
    }, "json");
  } else {
    $.get("/dashboard/json_index", { id: this.value }, function(data){
      $.each(data, function(){
        $.each(this, function(k, v){
          me.append( new Option(v.name, v.id) )
        });
      });
    }, "json");
  } 
}