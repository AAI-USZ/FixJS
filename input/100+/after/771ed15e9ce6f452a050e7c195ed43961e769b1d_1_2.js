function onMessageHandler (e) {
        var message = decodeMessage(e.data);
        switch (message.type) {
            //case 'set_badge':
            //    button.badge.display = "block";
            //    button.badge.textContent = message.blocked || '0';
            //    button.badge.color = "white";
            //    break;
            case 'status_enabled':
                setButtonState(e.source, true);
                break;
            case 'get_filters':
                if (!e.source) return;

                if (!message.url || !message.url.length) {
                    log('URL/CSS filter import error -> invalid URL.');
                    e.source.postMessage(encodeMessage({
                        type: 'noads_import_status',
                        status: 'download failed',
                        url: 'unknown'
                    }));
                    return;
                }

                var message_rules = 0, message_success = [], message_error = [], message_fileerror = [], importerCallback = function (rulesN) {
                    if (rulesN) {
                        message_success.push(message.url[subsc]);
                        message_rules = rulesN;
                    } else {
                        message_fileerror.push(message.url[subsc]);
                    }
                };
                for (var subsc = 0, l = message.url.length; subsc < l; subsc++) {
                    try {
                        importer.request(message.url[subsc], subsc, message.allRules, importerCallback);
                    } catch (ex) {
                        log('URL/CSS filter import error -> ' + ex);
                        message_error.push(message.url[subsc]);
                    }
                }
                if (message_success.length) {
                    e.source.postMessage(encodeMessage({
                        type: 'noads_import_status',
                        status: 'good',
                        url: '\n' + message_success.join('\n') + '\n',
                        length: message_rules
                    }));
                }
                if (message_fileerror.length) {
                    e.source.postMessage(encodeMessage({
                        type: 'noads_import_status',
                        status: 'file error',
                        url: '\n' + message_fileerror.join('\n') + '\n'
                    }));
                }
                if (message_error.length) {
                    e.source.postMessage(encodeMessage({
                        type: 'noads_import_status',
                        status: 'download failed',
                        url: '\n' + message_error.join('\n') + '\n'
                    }));
                }
                break;
            case 'unblock_address':
                log('user URL-filter removing url -> ' + message.url);
                opera.extension.urlfilter.block.remove(message.url);
                var filters_length = importer.array_user_filters.length;
                for (var i = 0; i < filters_length; i++) {
                    if (importer.array_user_filters[i] == message.url) {
                        importer.array_user_filters.splice(i, 1);
                        break;
                    }
                }
                if (filters_length) {
                    setValue('noads_userurlfilterlist', importer.array_user_filters.join('\n'));
                } else {
                    setValue('noads_urlfilterlist', '');
                }
                break;
            case 'block_address':
                log('user URL-filter adding url -> ' + message.url);
                opera.extension.urlfilter.block.add(message.url);
                importer.array_user_filters.unshift(message.url);
                setValue('noads_userurlfilterlist', importer.array_user_filters.join('\n'));
                break;
            case 'reload_rules':
                importer.reloadRules(message.global, message.clear);
                break;
            case 'noads_import_status':
                if (message.status === 'good') {
                    window.alert(lng.iSubs.replace('%url', message.url).replace('%d', message.length));
                } else {
                    window.alert(lng.mSubscriptions + ' ' + lng.pError + ': ' + message.status + '\n\nURL: ' + message.url);
                }
                break;
        }
    }