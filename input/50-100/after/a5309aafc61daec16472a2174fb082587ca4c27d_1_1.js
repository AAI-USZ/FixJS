function(config) {

        var public, fs;

        fs    = require('fs');
        public  = config.public;

        // 静的コンテンツパス設定
        if(fs.existsSync(public)) {
            return Ext.server.Connect.static(public);
        }

        return null;
    }