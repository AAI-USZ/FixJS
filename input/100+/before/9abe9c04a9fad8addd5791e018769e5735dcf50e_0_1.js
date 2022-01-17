function()
    {
        this.is_popup = !Object.isUndefined(HordeCore.base);

        /* Initialize redirect elements. */
        if (DimpCore.conf.redirect) {
            $('redirect').observe('submit', Event.stop);
            new TextareaResize('redirect_to');
            if (DimpCore.conf.URI_ABOOK) {
                $('redirect_sendto').down('TD.label SPAN').addClassName('composeAddrbook');
            }
            $('dimpLoading').hide();
            $('composeContainer', 'redirect').invoke('show');
            return;
        }

        /* Attach event handlers. */
        if (Prototype.Browser.IE) {
            // IE doesn't bubble change events.
            $('identity', 'upload').invoke('observe', 'change', this.changeHandler.bindAsEventListener(this));
        } else {
            document.observe('change', this.changeHandler.bindAsEventListener(this));
        }
        $('compose').observe('submit', Event.stop);

        HordeCore.initHandler('click');
        HordeCore.handleSubmit($('compose'), {
            callback: this.uniqueSubmitCallback.bind(this)
        });

        if (DimpCore.context.ctx_msg_other.size()) {
            DimpCore.addPopdown($('msg_other_options').down('A'), 'msg_other', {
                trigger: true
            });
        } else {
            $('msg_other_options').hide();
        }

        /* Create sent-mail list. */
        if (DimpCore.conf.flist) {
            this.createPopdown('sm', {
                base: 'save_sent_mail',
                data: DimpCore.conf.flist,
                input: 'save_sent_mail_mbox',
                label: 'sent_mail_label'
            });
            this.setPopdownLabel('sm', ImpComposeBase.identities[$F('identity')].sm_name);
        }

        /* Create priority list. */
        if (DimpCore.conf.priority) {
            this.createPopdown('p', {
                base: 'priority_label',
                data: DimpCore.conf.priority,
                input: 'priority',
                label: 'priority_label'
            });
            this.setPopdownLabel('p', $F('priority'));
        }

        /* Create encryption list. */
        if (DimpCore.conf.encrypt) {
            this.createPopdown('e', {
                base: $('encrypt_label').up(),
                data: DimpCore.conf.encrypt,
                input: 'encrypt',
                label: 'encrypt_label'
            });
            this.setPopdownLabel('e', $F('encrypt'));
        }

        new TextareaResize('to');

        /* Add addressbook link formatting. */
        if (DimpCore.conf.URI_ABOOK) {
            $('sendto', 'sendcc', 'sendbcc', 'redirect_sendto').compact().each(function(a) {
                a.down('TD.label SPAN').addClassName('composeAddrbook');
            });
        }

        $('dimpLoading').hide();
        $('composeContainer', 'compose').invoke('show');

        if (this.onload_show) {
            this.fillForm(this.onload_show);
            delete this.onload_show;
        } else {
            this.resizeMsgArea();
        }
    }