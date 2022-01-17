function hide_show(section_handler, tag_handler) {
   fade_seconds = 0;
   if (section_handler.data("show") === "undefined") {
        hide(section_handler, tag_handler);
   } else if (section_handler.data("show") == 0) {
        show(section_handler, tag_handler);
    } else {
        hide(section_handler, tag_handler);
    }
}