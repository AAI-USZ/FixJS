function(mode, message) {
    
    var cfg = M.block_jmail.cfg;
    var Y = M.block_jmail.Y;
    var messageId = 0;

    if (M.block_jmail.newemailOpen) {
        return false;
    }    
    M.block_jmail.newemailOpen = true;
    
    M.block_jmail.processMenuButtons();
    
    M.block_jmail.app.composePanel.cfg.setProperty("visible",true);
    M.block_jmail.app.composePanel.show();
    
    Y.one('#hiddento').set('value', '');
    Y.one('#hiddencc').set('value', '');
    Y.one('#hiddenbcc').set('value', '');
    Y.one('#subject').set('value', '');
    Y.one('#composetolist').setContent('');
    Y.one('#composecclist').setContent('');
    Y.one('#composebcclist').setContent('');
    Y.one('#newemailformremote').setContent('');
    
    if (typeof message == 'object') {        
        messageId = message.id;
        
        if (mode == 'forward') {
            message.subject = M.str.block_jmail.fw+message.subject;
        }
        
        if (mode == 'reply') {
            message.subject = M.str.block_jmail.re+' '+message.subject;
            M.block_jmail.addContact(message.sender, message.from, 'to');
        }

        if (mode == 'replytoall') {
            message.subject = M.str.block_jmail.re+message.subject;
            M.block_jmail.addContact(message.sender, message.from, 'to');
            for (var el in message.destinataries) {
                var dest = message.destinataries[el];            
                for (var el2 in dest) {
                    if (dest[el2].userid == cfg.userid) {
                        continue;
                    }
                    M.block_jmail.addContact(dest[el2].userid, dest[el2].fullname, el);
                }
            }
        }
        
        if (mode == 'edit') {            
            for (var el in message.destinataries) {
                var dest = message.destinataries[el];            
                for (var el2 in dest) {
                    M.block_jmail.addContact(dest[el2].userid, dest[el2].fullname, el);
                }
            }
        }
        
        Y.one('#subject').set('value', message.subject);       
    }
    
    // Preserve the M.str object (Firefox bug)
    
    var Mstr = M.str;
    
    var iocfg = {
         sync: true
     };

    if (messageId) {
        courseid = message.courseid;
        M.block_jmail.currentComposeCourse.shortname = message.courseshortname;
    } else {
        courseid = cfg.courseid;
    }
    
    M.block_jmail.currentComposeCourse.id = courseid;
    
    var uri = 'message.php?id='+courseid+'&messageid='+messageId+'&mode='+mode;
    var request = Y.io(uri, iocfg);
    
    var formHtml = request.responseText;            
    Y.one('#newemailformremote').insert(formHtml);
    M.block_jmail.Y = Y;

    // So so uggly hack
    // Firefox excluded    
    // if (Y.UA.gecko <= 0) {
        var elementsToEval = ["Y.use('editor_tinymce'","Y.use('editor_tinymce'","Y.use('form_filemanager'"];
        for (var el in elementsToEval) {
            var startIndex = formHtml.indexOf(elementsToEval[el]);
            formHtml = formHtml.substr(startIndex);        
            var stopIndex = formHtml.indexOf("});") + 7;
            
            var js = formHtml.substring(0, stopIndex);
            js = js.replace('<!--','');
            js = js.replace('-->','');
            
            eval('try {'+js+'} catch(e) {}');
            formHtml = formHtml.substr(stopIndex);
        }
    // }    window.tinyMCE.get('id_body').focus();

    M.str = Mstr;    
}
