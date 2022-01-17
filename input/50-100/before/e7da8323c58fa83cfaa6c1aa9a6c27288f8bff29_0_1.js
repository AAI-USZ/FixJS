function(event){
          var tab = $(this).parent().parent();
          var selected = tab.tabs("option", "selected"); 
          selected = selected - 1;
          tab.tabs('select', selected);
          event.preventDefault();
        }