function(event, ui) {
           var tabPane = ui.panel;
           if ($(tabPane).attr("class").indexOf("resized-and-repositioned")==-1) {
               resizeFields(tabPane);
               repositionFields(tabPane);
               $(tabPane).addClass("resized-and-repositioned");
           }
       }