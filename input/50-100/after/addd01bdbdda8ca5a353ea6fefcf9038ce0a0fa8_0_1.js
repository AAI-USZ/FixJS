function(ev) {
                var signer = new geierlein.Signer();
                try {
                    signer.setKeyFromPkcs12Der(ev.target.result, pincode);
                } catch(e) {
                    alert('Das Software-Zertifikat konnte nicht korrekt entschlüsselt werden.  Die Datei ist ungültig, bzw. der PIN-Code falsch.');
                    $('#wait').modal('hide');
                    return;
                }
                geierlein.sendData(asTestcase, signer);
            }