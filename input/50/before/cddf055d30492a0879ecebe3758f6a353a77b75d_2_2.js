function (param) {
                    var obj = {},
                    result;
                    obj.param = param;
                    result = validators[name].call(obj, val);
                    this.message = obj.message;
                    return result;   
                }