function ap_ext_newStatus() {
 newstatus = $("#newstatus").val();
 if (newstatus == "") {
     alert(lang_checkStatusname);
     return false;
 }
 $.post(ap_ext_path + "processor.php", { axAction: "createStatus", axValue: newstatus, id: 0 }, 
 function(data) {
     ap_ext_refreshSubtab('status');
 });
}