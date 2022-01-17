function drop(e) {
   e.preventDefault();
   var realtarget = $(e.target).closest(".tracker-div");
   var data = e.dataTransfer.getData("Text");
   //console.log("Dropped on " + realtarget.attr("id") + ", with data: " + data);
   $.ajax({
      url: "/ajax?request=move_tracker&url=" + data + "&target_alias=" + realtarget.attr("id").split("tracker-")[1],
      success: function (data) {
         console.log(data);
      }
   });
}