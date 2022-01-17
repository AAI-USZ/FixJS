function navigate_tab(elem) {
     //window.location.replace(window.location);
     var which = elem.id.split("tab_")[1];
     var loc = window.location.toString();
     if (loc.indexOf("?") == -1) {
          window.location.replace(loc + "?which=" + which);
     } else {
          window.location.replace(loc.split("?")[0] + "?which=" + which);
     }
}