function(data) {
         if (confirm(data)) {
             $.post(ap_ext_path + "processor.php", {axAction: "deleteStatus", axValue: 1, id: id }, 
                 function() { ap_ext_refreshSubtab('status'); }
             );
         }
     }