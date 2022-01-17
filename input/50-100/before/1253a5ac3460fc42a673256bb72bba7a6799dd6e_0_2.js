function drop(e) {
   e.preventDefault();
   var realtarget = $(e.target).closest(".tracker-div");
   var data = e.dataTransfer.getData("Text");
   console.log("Dropped on " + realtarget.attr("id") + ", with data: " + data);
}