function ap_ext_deleteStatus(id) {
 $.post(ap_ext_path + "processor.php", { axAction: "deleteStatus", axValue: 0, id: id }, 
     function(data) {
         if (confirm(data)) {
             $.post(ap_ext_path + "processor.php", {axAction: "deleteStatus", axValue: 1, id: id }, 
                 function() { ap_ext_refreshSubtab('status'); }
             );
         }
     }
 );
}