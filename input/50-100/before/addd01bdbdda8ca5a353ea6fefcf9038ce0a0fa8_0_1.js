function(ev) {
                var signer = new geierlein.Signer();
                signer.setKeyFromPkcs12Der(ev.target.result, pincode);
                geierlein.sendData(asTestcase, signer);
            }