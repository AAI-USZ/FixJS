function backupWallet(method, successcallback, errorcallback, extra) {
    if (offline) return;

    try {
        if (method == null) method = 'update';

        if (!isInitialized && method != 'insert')
            return false;

        if (guid.length != 36) {
            throw 'Invalid wallet identifier';
        }

        var data = makeWalletJSON();

        //Everything looks ok, Encrypt the JSON output
        var crypted = encrypt(data, password);

        if (crypted.length == 0) {
            throw 'Error enrypting the JSON output';
        }

        //Now Decrypt the it again to double check for any possible curruption
        var obj = null;
        decrypt(crypted, password, function(decrypted) {
            try {
                obj = $.parseJSON(decrypted);
                return (obj != null);
            } catch (e) {
                return false;
            };
        });

        if (obj == null) {
            makeNotice('error', 'misc-error', 'Error Decrypting Wallet, Not saving. This is a serious error..');
            return false;
        }

        //SHA256 new_checksum verified by server in case of curruption during transit
        var new_checksum = Crypto.util.bytesToHex(Crypto.SHA256(crypted, {asBytes: true}));

        setLoadingText('Saving wallet');

        if (extra == null)
            extra = '';

        encrypted_wallet_data = crypted;

        $.ajax({
            type: "POST",
            url: root + 'wallet' + extra,
            data: { guid: guid, length: crypted.length, payload: crypted, sharedKey: sharedKey, checksum: new_checksum, old_checksum : payload_checksum,  method : method },
            converters: {"* text": window.String, "text html": true, "text json": window.String, "text xml": window.String},
            success: function(data) {

                var change = false;
                for (var key in addresses) {
                    var addr = addresses[key];
                    if (addr.tag == 1) {
                        addr.tag = null; //Make any unsaved addresses as saved
                        change = true;
                    }

                    //Update view remove 'Unsynced' tags
                    if (change)
                        buildVisibleView();
                }

                //Update to the new payload new_checksum
                payload_checksum = new_checksum;

                makeNotice('success', 'misc-success', data);

                if (successcallback != null)
                    successcallback();

                updateCacheManifest();
            },

            error : function(data) {
                makeNotice('error', 'misc-error', data.responseText, 10000);

                if (errorcallback != null)
                    errorcallback();
            }
        });
    } catch (e) {
        makeNotice('error', 'misc-error', e, 10000);
        throw e;
    }
}