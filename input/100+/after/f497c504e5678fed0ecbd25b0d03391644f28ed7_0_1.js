function () {
                var textarea = document.getElementById('noads_jsblocks_textarea');
                var val = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd).replace(/^\s+|\r|\s+$/g, '');
                if (val) {
                    val = val.replace(/[*+?^=!${}()\.|[\]\\]|\.(?!\w)/g, '\\$&').replace(/http:/gi,'https?:').replace(/\n+/g, '|');
                    var whitelist = getValue('noads_scriptlist_white');
                    setValue('noads_scriptlist_white', '@@==' + val + (whitelist ? '\n' + whitelist : ''));
                    alert(lng.pBlockedAdded + ' ' + val);
                }
            }