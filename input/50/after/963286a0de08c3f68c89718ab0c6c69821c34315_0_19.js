function(data) {
         if (confirm(data)) {
             $.post(adminPanel_extension_path + "processor.php", {axAction: "deleteStatus", axValue: 1, id: id }, 
                 function() { adminPanel_extension_refreshSubtab('status'); }
             );
         }
     }