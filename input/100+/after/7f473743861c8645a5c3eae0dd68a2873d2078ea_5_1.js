function get_Add_Register_Student_Popup(strURL)
{
    student_list_modal = student_list_modal || null;
    if(student_list_modal !== null)
    {
        close_popup();
    }
    student_list_modal = new UI.Window({ theme:"lightbox", width:400, height:350});
    student_list_modal.setContent("<div style='padding:10px'>Loading...Please Wait.</div>").show(true).focus().center();
    student_list_modal.setHeader("Add and Register New Student");
    var clazz_id = $("portal_clazz_id").value;
    var options = {
        method: 'post',
        onSuccess: function(transport) {
            var text = transport.responseText;
            text = "<div id='oErrMsgDiv' style='color:Red;font-weight:bold'></div>"+ text;
            student_list_modal.setContent("<div style='padding:10px'>" + text + "</div>");
        }
    };
    var target_url = "/portal/classes/"+clazz_id+"/add_new_student";
    new Ajax.Request(target_url, options);
}