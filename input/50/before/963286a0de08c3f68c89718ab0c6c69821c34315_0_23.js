function ap_ext_checkupdate() {
    $.post("checkupdate.php",
        function(data) {
           $('#ap_ext_checkupdate').html(data);
        }
    );
    
}