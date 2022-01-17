function(action) {
    var cfg = M.block_jmail.cfg;
    var Y = M.block_jmail.Y;
    
    var form = Y.one('#mform1');
    
    var messageid = form.get("messageid").get("value");
    var to = Y.one('#hiddento').get('value');
    var cc = Y.one('#hiddencc').get('value');
    var bcc = Y.one('#hiddenbcc').get('value');
    var subject = encodeURIComponent(Y.Lang.trim(Y.one('#subject').get('value')));
    
    var errors = '';
    
    if (action == 'send_message') {
        if (!to) {
            errors += '<p>'+M.str.block_jmail.errortorequired+'</p>';
        }
        
        if (subject.length < 1) {
            errors += '<p>'+M.str.block_jmail.errorsubjectrequired+'</p>';
        }
    }
    
    if (errors) {
        M.block_jmail.showMessage(errors, 6000);
        return false;
    }
    
    window.tinyMCE.triggerSave();
    window.tinyMCE.get('id_body').setProgressState(1);
    var body = encodeURIComponent(Y.one('#id_body').get("value"));
    var attachments = form.get("attachments").get("value");
    var editoritemid = form.get("body[itemid]").get("value");
    
    var url = 'block_jmail_ajax.php?id='+M.block_jmail.currentComposeCourse.id+'&action='+action+'&sesskey='+cfg.sesskey;
    url += '&to='+to;
    url += '&cc='+cc;
    url += '&bcc='+bcc;
    url += '&subject='+subject;
    url += '&body='+body;
    url += '&attachments='+attachments;
    url += '&editoritemid='+editoritemid;
    url += '&messageid='+messageid;
    
    var cfg = {
        on: {
            complete: function(id, o, args) {
                var cfg = M.block_jmail.cfg;
                window.tinyMCE.get('id_body').setProgressState(0);
                M.block_jmail.app.composePanel.hide();
                // Remove all the form elements
                // We do a cascade remove for some firefox issues
                var messageAlert = (action == 'send_message')? M.str.block_jmail.messagesent : M.str.block_jmail.messagesaved;
                var messageTime = 2000;
                
                if (action == 'send_message' && cfg.approvemode && !cfg.canapprovemessages) {
                    messageAlert += '<br/>'+M.str.block_jmail.messagehastobeapproved;
                    messageTime = 4000;
                }
                
                if (action == 'send_message' && M.block_jmail.cfg.globalinbox) {
                    if (M.block_jmail.currentComposeCourse.id != M.block_jmail.cfg.courseid) {
                        var addiotonalInfo =  M.str.block_jmail.delivertodifferentcourse +' '+M.block_jmail.currentComposeCourse.shortname;
                    } else {
                        var addiotonalInfo =  M.str.block_jmail.delivertoglobalinbox;
                    }
                    messageAlert += '<br/>'+addiotonalInfo;
                    messageTime = 6000;
                }
                
                M.block_jmail.showMessage(messageAlert, messageTime);
                window.tinyMCE.remove(window.tinyMCE.get('id_body'));
                window.tinyMCE.execCommand('mceRemoveControl',true,'id_body');                
                Y.one("#id_body_ifr").remove();
                Y.one("#mform1").remove();
                Y.one('#newemailformremote').setContent('');
            }
        }
    };
    Y.io(url, cfg);
    
}