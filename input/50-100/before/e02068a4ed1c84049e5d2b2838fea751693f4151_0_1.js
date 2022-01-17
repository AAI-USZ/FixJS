function dropInfo(e) {
   e.preventDefault();
   console.log("Dropped into info box");
   $(e.target).css({
      "color": "",
      "font-weight": ""
   });
   var data = e.dataTransfer.getData("Text");
   $.ajax({
      url: "/ajax?request=move_tracker&url=" + data + "&target_alias=" + null,
      success: function (data) {
         if (data == "OK") {
            refresh_page();
         } else {
            console.log(data);
         }
      }
   })
}