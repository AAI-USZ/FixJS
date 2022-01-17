function() {
            if(this._os === 'mac') {
                location.href = '/ninja_localcloud_for_mac.zip';
            } else if (this._os === 'windows') {
                location.href = '/ninja_localcloud_for_windows.zip';
            } else {
                alert('Your operating system is not supported by the Ninja Local Cloud App.');
            }
        }