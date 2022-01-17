function showoptions(nam) {
   $(".selected").each(function () {
      if (this.id !== "tab_options") {
         $(this).removeClass("selected");
      }
   })

   var tabs = ["pyrt","general","throttle","network","performance","trackers"]; 
   if (tabs.indexOf(nam) == -1) {
      nam = "pyrt";
   }
   
   tabView = nam;
   $("#" + nam + "-tab").addClass("selected");
   $("#" + nam).parent().addClass("selected");
}