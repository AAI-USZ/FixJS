function(text) {
            var type = require('jsdoc/tag/type'),
                [tp, tx] = type.getTagType(text);
            return tp || text;
        }