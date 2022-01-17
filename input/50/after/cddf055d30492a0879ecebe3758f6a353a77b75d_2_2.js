function (param) {
                    var obj = {},
                    result;
                    obj.param = param;
                    result = staticValidators[name].call(obj, val);
                    this.message = obj.message;
                    return result;   
                }