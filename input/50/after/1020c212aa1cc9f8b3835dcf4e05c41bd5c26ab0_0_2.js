function()
        {
            for (var i in _delegates) {
                Util.callUserFuncArray(_delegates[i], arguments);
            }
        }