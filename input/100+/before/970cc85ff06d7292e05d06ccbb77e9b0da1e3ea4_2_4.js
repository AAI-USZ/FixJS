function() {
        try {
            getSecondPassword(function() {
                var address = generateNewAddressAndKey();

                labelAddress(address.toString());

                buildVisibleView();

                backupWallet();
            });
        } catch (e) {
            makeNotice('error', 'misc-error', e);
        }
    }