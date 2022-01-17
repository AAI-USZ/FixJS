function(searchString, handlePhrases) {
            var ret = "";
            var advancedSearchRegex = new RegExp("(AND|OR|\"|-|_)", "g");
            var removeArray = [" AND", " OR"];
            var truncateLength = 1500;

            ret = $.trim(searchString);

            // We only join every single word with "AND" when
            // we are sure there it isn't an advanced search query
            if (!advancedSearchRegex.test(searchString)) {
                if (handlePhrases) {
                    ret = '"' + ret.split(', ').join('" AND "') + '"';
                } else {
                    ret = ret.split(' ').join(' AND ');
                }
            }

            if (ret.length > truncateLength) {
                // Truncate the string just until the maximum length allowed
                ret = ret.substring(0, truncateLength);
                // Go back to the end of the previous word, so we don't
                // truncate in the middle of a word
                ret = ret.replace(/\w+$/, '');
            }

            // We need to remove AND & OR if they are the last words
            // of the querystring. Otherwise we get a 500 exception
            ret = $.trim(ret);
            for (var i = 0, j = removeArray.length; i < j; i++) {
                var item = removeArray[i];
                if (ret.substr(-item.length) === item) {
                    ret = ret.substring(0, ret.length - item.length);
                }
            }
            return ret;
        }