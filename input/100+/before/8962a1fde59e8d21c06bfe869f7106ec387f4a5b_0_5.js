function (pos) {
            var defaultValue = Number(getValue('noads_autoupdate_interval')) / 86400000,
            label = document.createElement('label'),
            span = document.createElement('span'),
            input = document.createElement('input'),
            lastUpdateNode = document.createElement('span');

            this.clear(pos);

            var p = document.createElement('p');
            p.className = 'noads_input_help';
            p.appendChild(document.createTextNode('Subscriptions:')); //TODO:translate
            this.appendChild(p);

            lastUpdateNode.id = 'noads_autoupdate_lastupdate';
            lastUpdateNode.appendChild(document.createTextNode(''));

            label.appendChild(lastUpdateNode);
            label.appendChild(document.createElement('br'));

            label.appendChild(document.createTextNode(lng.uInterval + ' '));
            span.appendChild(document.createTextNode(defaultValue.toString()));
            span.id = 'noads_autoupdate_days_span';
            label.appendChild(span);
            label.appendChild(document.createElement('br'));

            label.setAttribute('for', 'noads_autoupdate_interval');
            label.id = 'noads_autoupdate_label';

            input.id = 'noads_autoupdate_interval';
            input.type = 'range';
            input.min = 1;
            input.max = 15;
            input.value = defaultValue;
            input.onchange = function () {
                span.firstChild.nodeValue = this.value.toString();
            };

            label.appendChild(input);
            this.appendChild(label);

            var block = document.createElement('fieldset');
            block.className = 'noads_subscriptions_block';

            this.createCheckboxButton.call(block, 'EasyList', 'https://easylist-downloads.adblockplus.org/easylist.txt');
            this.createCheckboxButton.call(block, 'EasyList and EasyPrivacy combination', 'https://easylist-downloads.adblockplus.org/easyprivacy+easylist.txt');
            this.createCheckboxButton.call(block, 'RuAdList/EasyList russian', 'https://easylist-downloads.adblockplus.org/ruadlist+easylist.txt');
            this.createCheckboxButton.call(block, 'EasyList german', 'https://easylist-downloads.adblockplus.org/easylistgermany.txt');
            this.createCheckboxButton.call(block, 'EasyList bulgarian', 'http://stanev.org/abp/adblock_bg.txt');
            this.createCheckboxButton.call(block, 'EasyList french', 'http://lian.info.tm/liste_fr.txt');
            this.createCheckboxButton.call(block, 'EasyList japanese', 'http://adblock-plus-japanese-filter.googlecode.com/hg/abp_jp.txt');
            this.createCheckboxButton.call(block, 'EasyList greek', 'http://www.void.gr/kargig/void-gr-filters.txt');
            this.createCheckboxButton.call(block, 'EasyList polish', 'http://adblocklist.org/adblock-pxf-polish.txt');
            this.createCheckboxButton.call(block, 'EasyList chinese', 'http://adblock-chinalist.googlecode.com/svn/trunk/adblock.txt');
            this.createCheckboxButton.call(block, 'EasyList romanian', 'http://www.zoso.ro/pages/rolist.txt');
            this.createCheckboxButton.call(block, 'EasyList finnish', 'http://www.wiltteri.net/wiltteri.txt');
            this.createCheckboxButton.call(block, 'FanBoy Annoyance list', 'http://www.fanboy.co.nz/fanboy-addon.txt');
            block.appendChild(document.createElement('br'));
            this.createCheckboxButton.call(block, 'Fanboy Main', 'http://www.fanboy.co.nz/adblock/opera/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Fanboy Main+Tracking', 'http://www.fanboy.co.nz/adblock/opera/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Chinese', 'http://www.fanboy.co.nz/adblock/opera/chn/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Chinese+Tracking', 'http://www.fanboy.co.nz/adblock/opera/chn/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Czech', 'http://www.fanboy.co.nz/adblock/opera/cz/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Czech+Tracking', 'http://www.fanboy.co.nz/adblock/opera/cz/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Espanol/Portuguese', 'http://www.fanboy.co.nz/adblock/opera/esp/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Espanol/Portuguese+Tracking', 'http://www.fanboy.co.nz/adblock/opera/esp/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Japanese', 'http://www.fanboy.co.nz/adblock/opera/jpn/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Japanese+Tracking', 'http://www.fanboy.co.nz/adblock/opera/jpn/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Korean', 'http://www.fanboy.co.nz/adblock/opera/krn/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Korean+Tracking', 'http://www.fanboy.co.nz/adblock/opera/krn/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Merged Asian Lists', 'http://www.fanboy.co.nz/adblock/opera/asian/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Merged Asian Lists+Tracking', 'http://www.fanboy.co.nz/adblock/opera/asian/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Polish', 'http://www.fanboy.co.nz/adblock/opera/pol/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Polish+Tracking', 'http://www.fanboy.co.nz/adblock/opera/pol/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Russian', 'http://www.fanboy.co.nz/adblock/opera/rus/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Russian+Tracking', 'http://www.fanboy.co.nz/adblock/opera/rus/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Swedish', 'http://www.fanboy.co.nz/adblock/opera/swe/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Swedish+Tracking', 'http://www.fanboy.co.nz/adblock/opera/swe/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Turkish', 'http://www.fanboy.co.nz/adblock/opera/trky/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Turkish+Tracking', 'http://www.fanboy.co.nz/adblock/opera/trky/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Vietnamese', 'http://www.fanboy.co.nz/adblock/opera/vtn/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Vietnamese+Tracking', 'http://www.fanboy.co.nz/adblock/opera/vtn/complete/urlfilter.ini');
            this.createCheckboxButton.call(block, 'Latvian List', 'https://gitorious.org/adblock-latvian/adblock-latvian/blobs/raw/master/lists/urlfilter.ini');
            block.appendChild(document.createElement('br'));
            this.createCheckboxButton.call(block, 'AntiSocial List', 'https://adversity.googlecode.com/hg/Antisocial.txt');
            this.createCheckboxButton.call(block, 'Malware Domains', 'http://malwaredomains.lanik.us/malwaredomains_full.txt');
            this.createCheckboxButton.call(block, 'Rickroll Database', 'http://rickrolldb.com/ricklist.txt');
            //block.appendChild(document.createElement('br'));
            this.createCheckboxButton.call(block, ' (*.txt, *.ini)', getValue('noads_custom_url'), true);

            this.appendChild(block);

            this.appendChild(this.createButton('noads_dlsubscription', lng.pDownload, '', imgRefresh, function () {
                var dlsubscription = document.getElementById('noads_dlsubscription');
                if (dlsubscription.disabled === true) {
                    return;
                } else {
                    dlsubscription.disabled = true;
                }

                var url = [], inputs = area.querySelectorAll('input[type="checkbox"]:checked');
                for (var i = 0, radioButton; radioButton = inputs[i]; i++) {
                    url.push(radioButton.nextElementSibling.nextElementSibling.href || radioButton.nextElementSibling.firstElementChild.value);
                }


                dlsubscription.firstChild.src = imgLoad;
                if (url.length > 0) {
                    setValue('noads_default_url2', url.toString());
                }
                sendMessage({ type: 'get_filters', url: url, allRules: document.getElementById('noads_allrules_toggle').checked });
            }));

            this.appendChild(this.createCheckbox('noads_allrules', lng.pAllRules, 'positive', '', 'negative unchecked'));

            options.setLastUpdate(lastUpdateNode);

            this.appendChild(this.createCheckbox('noads_autoupdate', lng.pEnabled, 'positive right', lng.pDisabled, 'negative unchecked right'));
            this.appendChild(this.createButton('noads_button_save', lng.pSave, 'positive right-second', imageTick, function () {
                var noads_autoupdate_interval = Number(document.getElementById('noads_autoupdate_interval').value) * 86400000;
                options.setAutoupdate(noads_autoupdate_interval);
            }));

        }