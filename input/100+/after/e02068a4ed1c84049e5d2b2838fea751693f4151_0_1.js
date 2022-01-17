function drop(e) {
   e.preventDefault();
   e.dataTransfer.dropEffect = "copy";
   console.log("drop")
   //var realtarget = $(e.target).closest(".tracker-div");
   //var data = e.dataTransfer.getData("Text");
   ////console.log("Dropped on " + realtarget.attr("id") + ", with data: " + data);
   //$.ajax({
   //   url: "/ajax?request=move_tracker&url=" + data + "&target_alias=" + realtarget.attr("id").split("tracker-")[1],
   //   success: function (data) {
   //      if (data == "OK") {
   //         refresh_page();
   //      } else {
   //         console.log(data);
   //      }
   //   }
   //});
}