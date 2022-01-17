function(cls_name, cls) {
            var ret = $.Class(cls_name, {}),
                key;

            for (key in ret.prototype) {
                cls.prototype[key] = ret.prototype[key];
            }

            ret.prototype = cls.prototype;

            return ret;
        }