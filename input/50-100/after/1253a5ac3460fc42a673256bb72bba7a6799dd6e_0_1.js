function dragstart(e) {
   e.dataTransfer.effectAllowed = "copy";
   var realtarget = $(e.target).closest(".tracker-div");
   e.dataTransfer.setData("Text", realtarget.attr("id"));
   $("#tracker-info").html("Drag here to create a new group");
}