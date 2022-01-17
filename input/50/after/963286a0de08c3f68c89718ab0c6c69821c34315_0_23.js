function adminPanel_extension_checkupdate() {
    $.post("checkupdate.php",
        function(data) {
           $('#adminPanel_extension_checkupdate').html(data);
        }
    );
    
}