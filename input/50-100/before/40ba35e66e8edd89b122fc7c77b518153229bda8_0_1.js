function(data, status, jqxhr) {
  console.log("received list name availability response");
  console.log("data: %o", data);

  $("#availability").empty().append( data.message );
  if (data.available) {
    $("#new_list_submit").attr("disabled", false);
  } else {
    $("#new_list_submit").attr("disabled", true);
  }
}