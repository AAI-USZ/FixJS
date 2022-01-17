function(resp)
    {
        var bg, ppuid, tmp,
            pm = $('previewMsg'),
            r = resp.response.preview,
            t = $('msgHeadersContent').down('THEAD'),
            vs = this.viewport.getSelection();

        bg = (!this.pp ||
              this.pp.uid != r.uid ||
              this.pp.mbox != r.mbox);

        if (r.error || vs.size() != 1) {
            if (!bg) {
                if (r.error) {
                    DimpCore.showNotifications([ { type: r.errortype, message: r.error } ]);
                }
                this.clearPreviewPane();
            }
            return;
        }

        // Store in cache.
        ppuid = this._getPPId(r.uid, r.mbox);
        this._expirePPCache([ ppuid ]);
        this.ppcache[ppuid] = resp;
        this.ppfifo.push(ppuid);

        if (bg) {
            return;
        }

        DimpCore.removeAddressLinks(pm);

        // Add subject
        tmp = pm.select('.subject');
        tmp.invoke('update', r.subject === null ? '[' + DIMP.text.badsubject + ']' : r.subject);

        // Add date
        [ $('msgHeaderDate') ].flatten().invoke(r.localdate ? 'show' : 'hide');
        [ $('msgHeadersColl').select('.date'), $('msgHeaderDate').select('.date') ].flatten().invoke('update', r.localdate);

        // Add from/to/cc/bcc headers
        [ 'from', 'to', 'cc', 'bcc' ].each(function(a) {
            if (r[a]) {
                (a == 'from' ? pm.select('.' + a) : [ t.down('.' + a) ]).each(function(elt) {
                    elt.replace(DimpCore.buildAddressLinks(r[a], elt.clone(false)));
                });
            }
            [ $('msgHeader' + a.capitalize()) ].invoke(r[a] ? 'show' : 'hide');
        });

        // Add attachment information
        if (r.atc_label) {
            $('msgAtc').show();
            tmp = $('partlist');
            tmp.previous().update(new Element('SPAN', { className: 'atcLabel' }).insert(r.atc_label)).insert(r.atc_download);
            if (r.atc_list) {
                tmp.down('TABLE').update(r.atc_list);
            }
        } else {
            $('msgAtc').hide();
        }

        // Add message information
        if (r.log) {
            this.updateMsgLog(r.log);
        } else {
            $('msgLogInfo').hide();
        }

        // Toggle resume link
        [ $('msg_resume_draft').up() ].invoke(this.isDraft(vs) ? 'show' : 'hide');

        // Add save link
        $('msg_save').down('A').writeAttribute('href', r.save_as);

        $('messageBody').select('IFRAME').invoke('blur');
        $('messageBody').update(
            (r.msgtext === null)
                ? $('messageBodyError').down().clone(true).show().writeAttribute('id', 'ppane_view_error')
                : r.msgtext
        );
        this.loadingImg('msg', false);
        $('previewInfo').hide();
        $('previewPane').scrollTop = 0;
        pm.show();

        if (r.js) {
            eval(r.js.join(';'));
        }
    }