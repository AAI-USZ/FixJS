function editSubject(subject,id) {
    var height = 180;
    var width = 450;
    if (subject == 'pct') {
      height = 250;
      width = 650;
    }
    floaterShow('floaters.php','add_edit_'+subject,0,id,width,height); return false;
}