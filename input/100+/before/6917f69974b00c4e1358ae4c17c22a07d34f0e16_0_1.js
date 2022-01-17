function hide_show(section_handler) {
   fade_seconds = 0;
   if (section_handler.data("show") === "undefined") {
       section_handler.hide(fade_seconds);
       section_handler.data("show", 0);
       $(this).text("Show conversations");
   } else if (section_handler.data("show") == 0) {
       section_handler.show(fade_seconds);
       section_handler.data("show", 1);
       $(this).text("Hide conversations");
    } else {
       section_handler.hide(fade_seconds);
       section_handler.data("show", 0);
       $(this).text("Show conversations");
    }
}