function FormData() {
        // Force a Constructor
        if (!(this instanceof FormData)) return new FormData();
        // Generate a random boundary - This must be unique with respect to the form's contents.
        this.boundary = '------RWWorkerFormDataBoundary' + Math.random().toString(36);
        var internal_data = this.data = [];
        /**
        * Internal method.
        * @param inp String | ArrayBuffer | Uint8Array  Input
        */
        this.__append = function(inp) {
            var i=0, len;
            if (typeof inp === 'string') {
                for (len=inp.length; i<len; i++)
                    internal_data.push(inp.charCodeAt(i) & 0xff);
            } else if (inp && inp.byteLength) {/*If ArrayBuffer or typed array */
                if (!('byteOffset' in inp))   /* If ArrayBuffer, wrap in view */
                    inp = new Uint8Array(inp);
                for (len=inp.byteLength; i<len; i++)
                    internal_data.push(inp[i] & 0xff);
            }
        };
    }