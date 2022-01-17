function() {
            //Creating an empty anchor to link to download file
            var link = document.createElement('a'), evt = document.createEvent("MouseEvents");
            link.download = 'Ninja-Local-Cloud';
            this.element.appendChild(link);
            //Creating a fake click event to init file download
            evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0,false, false, false, false, 0, null);
            //Setting proper download file based on OS
            if(this._os === 'mac') {
                link.href = '/ninja_localcloud_for_mac.zip';
                link.dispatchEvent(evt);
            } else if (this._os === 'windows') {
                link.href = '/ninja_localcloud_for_windows.zip';
                link.dispatchEvent(evt);
            } else {
                //Alerting user their OS is not supported
                alert('Your operating system is not supported by the Ninja Local Cloud App.');
            }
        }