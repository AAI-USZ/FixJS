function FormData() {
        // Force a Constructor
        if (!(this instanceof FormData)) return new FormData();
        // Generate a random boundary - This must be unique with respect to the form's contents.
        this.boundary = '------WebKitFormBoundary' + Math.random().toString(36);
        var internal_data = this.data = [];
        this.args=arguments;
        //得到参数的类型？
        // var argumentsType = Object.prototype.toString.call(arguments[0]);
        // console.log("argumentsType???"+argumentsType);

        if (arguments[0][0] instanceof HTMLFormElement){

                console.log("I am a HTMLFormElement");
                console.log(arguments[0][0]);
        }
        var internal_data_string=this.data_string=[];
        /**
        * Internal method.
        * @param inp String | ArrayBuffer | Uint8Array  Input
        */
        this.__append = function(inp) {
            var i=0, len;
            if (typeof inp === 'string') {
                internal_data_string.push(inp);
                for (len=inp.length; i<len; i++){
                    internal_data.push(inp.charCodeAt(i) & 0xff);                   
                }
            } else if (inp && inp.byteLength) {/*If ArrayBuffer or typed array */   
                if (!('byteOffset' in inp))   /* If ArrayBuffer, wrap in view */
                    inp = new Uint8Array(inp);
                for (len=inp.byteLength; i<len; i++)
                    internal_data.push(inp[i] & 0xff);
            }
        };
    }