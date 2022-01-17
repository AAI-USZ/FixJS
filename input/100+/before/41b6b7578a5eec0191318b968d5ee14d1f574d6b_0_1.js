function(uid, mbox)
    {
        var tmp,
            pm = $('previewMsg'),
            r = this.ppcache[this._getPPId(uid, mbox)];

        pm.select('.address').each(function(elt) {
            DimpCore.DMenu.removeElement(elt.identify());
        });

        // Add subject. Subject was already html encoded on server (subject
        // may include links).
        tmp = pm.select('.subject');
        tmp.invoke('update', r.subject === null ? '[' + DimpCore.text.badsubject + ']' : r.subject);

        // Add date
        [ $('msgHeaderDate') ].flatten().invoke(r.localdate ? 'show' : 'hide');
        [ $('msgHeadersColl').select('.date'), $('msgHeaderDate').select('.date') ].flatten().invoke('update', r.localdate);

        // Add from/to/cc/bcc headers
        [ 'from', 'to', 'cc', 'bcc' ].each(function(h) {
            if (r[h]) {
                this.updateHeader(h, r[h], true);
                $('msgHeader' + h.capitalize()).show();
            } else {
                $('msgHeader' + h.capitalize()).hide();
            }
        }, this);

        // Add attachment information
        if (r.atc_label) {
            $('msgAtc').show();
            tmp = $('partlist');
            tmp.previous().update(new Element('SPAN', { className: 'atcLabel' }).insert(r.atc_label)).insert(r.atc_download);
            if (r.atc_list) {
                tmp.update(new Element('TABLE').insert(r.atc_list));
            }
        } else {
            $('msgAtc').hide();
        }

        // Add message log information
        if (r.log) {
            DimpCore.updateMsgLog(r.log);
            $('msgLogInfo').show();
        }

        // Toggle resume link
        if (this.viewport.getMetaData('templates')) {
            $('msg_resume_draft').up().hide();
            $('msg_template').up().show();
        } else {
            $('msg_template').up().hide();
            [ $('msg_resume_draft').up() ].invoke(this.isDraft(this.viewport.getSelection()) ? 'show' : 'hide');
        }

        this.pp.hide_all = r.onepart;
        this.pp.save_as = r.save_as;

        $('messageBody').update(
            (r.msgtext === null)
                ? $('messageBodyError').down().clone(true).show().writeAttribute('id', 'ppane_view_error')
                : r.msgtext
        );

        // See: http://www.thecssninja.com/javascript/gmail-dragout
        if (Prototype.Browser.WebKit) {
            $('messageBody').select('DIV.mimePartInfo A.downloadAtc').invoke('observe', 'dragstart', this._dragAtc);
        }

        this.loadingImg('msg', false);
        $('previewInfo').hide();
        $('previewPane').scrollTop = 0;
        pm.show();

        if (r.js) {
            eval(r.js.join(';'));
        }
    }