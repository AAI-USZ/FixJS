function (sID, hTxt, sName) {
            var disabled = global ? !options.checkEnabled(sName + '_state') : !options.isActiveDomain(sName + '_white', domain),
                p = document.createElement('p'),
                textarea = document.createElement('textarea');

            p.className = 'noads_input_help';
            p.appendChild(document.createTextNode(hTxt));
            this.appendChild(p);

            textarea.rows = global ? '35' : '10';
            //textarea.rows = '100';
            textarea.cols = '100';
            textarea.value = options.getRawRules(sName, domain, global);
            textarea.id = sID;
            textarea.spellcheck = false;

            if (!global) {
                textarea.className = 'noads_site_textarea';
                textarea.disabled = disabled;
            } else {
                textarea.className = 'overflow';
            }

            return textarea;
        }