function dragstart(e) {
   e.dataTransfer.effectAllowed = "copy";
   e.dataTransfer.setData("Text", $(e.target).html());
   //$("#tracker-info").html("Drag here to create a new group");
   console.log("dragstart");
}