function(argcv, s) {
            stderr_txt.value += "<USER>:" + this._linenum._value + ":" +
                this._linepos._value + ": syntax error: " + s._value;
            if (this._linenum._value > 1)
                stderr_txt.value += "\n  " + (this._linenum._value - 1) + ": "
                    + callmethod(this._lines, "at",
                        [1], new GraceNum(this._linenum._value - 1))._value;
            var arr = "----";
            for (var i=0; i<this._linepos._value; i++)
                arr = arr + "-";
            stderr_txt.value += "\n  " + this._linenum._value + ": "
                + callmethod(this._lines, "at",
                        [1], new GraceNum(this._linenum._value))._value;
            stderr_txt.value += "\n" + arr + "^";
            if (this._linenum._value <
                    callmethod(this._lines, "size", [])._value)
                stderr_txt.value += "\n  " + (this._linenum._value + 1) + ": "
                    + callmethod(this._lines, "at",
                        [1], new GraceNum(this._linenum._value + 1))._value;
            throw "ErrorExit";
        }