function(text) {
            var type = require('jsdoc/tag/type'),
                tagType = type.getTagType(text);
            return tagType.type || text;
        }