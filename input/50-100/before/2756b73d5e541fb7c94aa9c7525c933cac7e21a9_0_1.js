function drop(e) {
   e.preventDefault();
   var realtarget = $(e.target).closest(".tracker-div");
   var data = e.dataTransfer.getData("Text");
   //console.log("Dropped on " + realtarget.attr("id") + ", with data: " + data);
   $.ajax({
      url: "/ajax?request=move_tracker&keys=" + Array("url", "target_alias") + "&values=" + encodeURIComponent(Array(data, realtarget.attr("id"))),
      success: function (data) {
         console.log(data);
      }
   });
}