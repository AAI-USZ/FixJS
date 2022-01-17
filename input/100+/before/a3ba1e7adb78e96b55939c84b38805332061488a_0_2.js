function (pos) {
            this.clear(pos);
            log('opened settings for ' + domain);

            var textucss = this.createTextarea('noads_usercss_textarea', lng.pUCSS, 'noads_userlist');
            this.appendChild(textucss);
            var inlinearea = document.createElement('div');
            inlinearea.className = 'inline';
            inlinearea.appendChild(this.createCheckbox('noads_userlist', lng.pEnabled, 'positive right', lng.pDisabled, 'negative right', null, function () {
                document.getElementById('noads_usercss_textarea').disabled = !options.checkEnabled('noads_userlist_state') || !options.isActiveDomain('noads_userlist_white', domain);
            }));
            inlinearea.appendChild(this.createButton('noads_button_save_usercss', lng.pSave, 'right-second', imageTick, function () {
                var val = document.getElementById('noads_usercss_textarea').value.replace(/^\s+|\r|\s+$/g, '');
                options.setRawRulesSite('noads_userlist', val, domain);
                options.setWhiteList('noads_userlist_white', val);
            }));
            this.appendChild(inlinearea);

            var textcss = this.createTextarea('noads_css_textarea', lng.pCSS, 'noads_list');
            this.appendChild(textcss);
            inlinearea = document.createElement('div');
            inlinearea.className = 'inline';
            inlinearea.appendChild(this.createCheckbox('noads_list', lng.pEnabled, 'positive right', lng.pDisabled, 'negative right', null, function () {
                document.getElementById('noads_css_textarea').disabled = !options.checkEnabled('noads_list_state') || !options.isActiveDomain('noads_list_white', domain);
            }));
            inlinearea.appendChild(this.createButton('noads_button_save_css', lng.pSave, 'right-second', imageTick, function () {
                var val = document.getElementById('noads_css_textarea').value.replace(/^\s+|\r|\s+$/g, '');
                options.setRawRulesSite('noads_list', val, domain);
                options.setWhiteList('noads_list_white', val);
            }));
            this.appendChild(inlinearea);

            // add to white list textarea
            var button = document.createElement('button');
            button.type = 'button';
            var disabled = !options.checkEnabled('noads_scriptlist_state') || !options.isActiveDomain('noads_scriptlist_white', domain);
            var p = document.createElement('p');
            p.className = 'noads_input_help';
            p.appendChild(document.createTextNode(lng.pBlockedScripts));
            this.appendChild(p);
            var textarea = document.createElement('textarea');
            textarea.id = 'noads_jsblocks_textarea';
            textarea.rows = '10';
            textarea.cols = '100';
            textarea.className = 'noads_site_textarea';
            textarea.spellcheck = false;
            if (!disabled) {
                textarea.value = blockedScripts.replace(/; /g, '\n');
            }
            textarea.disabled = disabled;
            textarea.readOnly = true;
            this.appendChild(textarea);

            // add to white list
            this.appendChild(this.createButton('noads_button_save', lng.pAddToWhite, 'positive', imageTick, function () {
                var textarea = document.getElementById('noads_jsblocks_textarea');
                var val = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd).replace(/^\s+|\r|\s+$/g, '');
                if (val) {
                    val = val.replace(/[*+?^=!${}()|[\]\\]|\.(?!\w)/g, '\\$&').replace(/\n+/g, '|');
                    var whitelist = getValue('noads_scriptlist_white');
                    setValue('noads_scriptlist_white', '@@==' + val + (whitelist ? '\n' + whitelist : ''));
                    alert(lng.pBlockedAdded + ' ' + val);
                }
            }));

            var checkbox = document.createElement('button');
            checkbox.type = 'checkbox';
            var img = document.createElement('img');
            img.src = imageCross;
            img.setAttribute('alt', '');
            checkbox.appendChild(img);
            var enable = document.createTextNode(lng.pBlockingDisable),
                disable = document.createTextNode(lng.pBlockingEnable),
                classEnabled = 'negative right',
                classDisabled = 'positive right',
                state = options.getForSite(domain);
                checkbox.checked = state;
            if (state) {
                checkbox.appendChild(enable);
                checkbox.className = classEnabled;
            } else {
                checkbox.appendChild(disable);
                checkbox.className = classDisabled;
            }
            textucss.disabled = !options.checkEnabled('noads_userlist_state') || !options.isActiveDomain('noads_userlist_white', domain);
            textcss.disabled = !options.checkEnabled('noads_list_state') || !options.isActiveDomain('noads_list_white', domain);

            checkbox.onclick = function () {
                var currentstate = !this.checked;
                if (currentstate) {
                    this.removeChild(disable);
                    this.appendChild(enable);
                    this.className = classEnabled;
                } else {
                    this.removeChild(enable);
                    this.appendChild(disable);
                    this.className = classDisabled;
                }
                textucss.disabled = !currentstate;
                textcss.disabled = !currentstate;
                textarea.disabled = !currentstate;
                this.checked = currentstate;
                options.setForSite(domain, currentstate);
                log('set whitelisted for <' + domain + '> to ' + options.getForSite(domain));
            };
            this.appendChild(checkbox);
        }