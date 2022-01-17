function(argcv, s) {
            stderr_txt.value += "<USER>:" + this._linenum._value + ":" +
                this._linepos._value + ": syntax error: " + s._value;
            throw "ErrorExit";
        }