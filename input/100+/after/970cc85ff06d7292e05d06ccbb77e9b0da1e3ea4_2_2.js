function didDecryptWallet() {

    //Add and address form #newaddr K=V tag
    if (addressToAdd != null) {
        if (walletIsFull())
            return;

        showWatchOnlyWarning(addressToAdd, function() {
            if (internalAddKey(addressToAdd)) {
                makeNotice('success', 'added-addr', 'Added Watch Only Address ' + addressToAdd);

                backupWalletDelayed();
            } else {
                makeNotice('error', 'error-addr', 'Error Adding Bitcoin Address');
            }
        });
    }

    if (privateKeyToSweep != null) {
        loadScript(resource + 'wallet/signer.min.js', function() {

            var address = privateKeyToSweep.getBitcoinAddress().toString();

            var obj = initNewTx();

            obj.from_addresses = [address];
            obj.extra_private_keys[address] = B58.encode(privateKeyToSweep.priv);

            obj.start();
        });
    }

    //We have dealt the the hash values, don't need them anymore
    window.location.hash = '';

    try {
        //Make sure the last guid the user logged in the ame as this one, if not clear cache
        var local_guid = localStorage.getItem('guid');

        if (local_guid != guid) {
            localStorage.clear();

            console.log('Set GUID ' + guid);

            localStorage.setItem('guid', guid);
        } else {
            //Restore the balance cache
            var multiaddrjson = localStorage.getItem('multiaddr');

            if (multiaddrjson != null) {
                parseMultiAddressJSON(multiaddrjson);

                buildVisibleView();
            }
        }

    } catch (e) { } //Don't care - cache is optional

    ///Get the list of transactions from the http API
    queryAPIMultiAddress();

    changeView($("#home-intro"));

    buildVisibleView();

    $('#initial_error').remove();
    $('#initial_success').remove();

    makeNotice('success', 'misc-success', 'Sucessfully Decrypted Wallet');
}