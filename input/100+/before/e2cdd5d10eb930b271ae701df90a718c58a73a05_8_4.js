function(tag) {
            if (tag) {
                tag = tag.replace(/[\\\/:;,\[\]\*'"|]/gi, "");
            }
            return tag;
        }