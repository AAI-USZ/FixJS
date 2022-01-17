function()
        {
            console.log('Apply!', _id, _delegates);
            for (var i in _delegates) {
                console.log('Delegate!', _delegates[i]);
                Util.callUserFuncArray(_delegates[i], arguments);
            }
        }