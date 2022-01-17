function(){
  var me = $("#work_unit_project_id");
  me.children().remove();
  me.append( new Option("Select a project","") )
  $("#work_unit_ticket_id").children().remove();
  $("#work_unit_ticket_id").append( new Option("Select a ticket",""))
  if(this.value != '') {
    if(document.getElementById("checkbox").checked) {   
      $.get("/dashboard/collaborative_client", { id: this.value }, function(data){
        $.each(data, function(){
          $.each(this, function(k, v){
            me.append( new Option(v.name, v.id) )
          });
        });
      }, "json");
    } else {
      $.get("/dashboard/client", { id: this.value }, function(data){
        $.each(data, function(){
          $.each(this, function(k, v){
            me.append( new Option(v.name, v.id) )
          });
        });
      }, "json");
    }
  }
}