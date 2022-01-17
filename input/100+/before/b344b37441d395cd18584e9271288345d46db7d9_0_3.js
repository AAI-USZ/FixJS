function(){
  var me = $("#work_unit_ticket_id")
  me.children().remove();
  me.append( new Option("Select a ticket","") )
  if(this.value != "") {
    $.get("/dashboard/project", { id: this.value }, function(data){
      $.each(data, function(){
        $.each(this, function(k, v){
          me.append( new Option(v.name, v.id) )
        });
      });
    }, "json");
  }
}