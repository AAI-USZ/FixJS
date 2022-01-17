function adminPanel_extension_newStatus() {
 newstatus = $("#newstatus").val();
 if (newstatus == "") {
     alert(lang_checkStatusname);
     return false;
 }
 $.post(adminPanel_extension_path + "processor.php", { axAction: "createStatus", axValue: newstatus, id: 0 }, 
 function(data) {
     adminPanel_extension_refreshSubtab('status');
 });
}