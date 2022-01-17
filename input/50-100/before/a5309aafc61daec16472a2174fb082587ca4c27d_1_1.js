function(config) {

        var public, path;

        path    = require('path');
        public  = config.public;

        // 静的コンテンツパス設定
        if(fs.existsSync(public)) {
            return Ext.server.Connect.static(public);
        }

        return null;
    }