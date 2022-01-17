function(searchString, handlePhrases, joinOn) {
            if (!joinOn) {
                joinOn = 'AND';
            }
            var ret = "";
            var advancedSearchRegex = new RegExp("(AND|OR|\"|-|_)", "g");
            var removeArray = ['AND', 'OR'];
            var truncateLength = 1500;

            ret = $.trim(searchString);

            // Remove the forward slashes
            ret = ret.replace(/\//g, '');

            // Replace multiple spaces with 1 space
            ret = ret.replace(/(\s)+/g, ' ');

            // We only join every single word with "AND" when
            // we are sure there it isn't an advanced search query
            if (!advancedSearchRegex.test(searchString)) {
                if (handlePhrases) {
                    ret = '"' + ret.split(', ').join('" ' + joinOn + ' "') + '"';
                } else {
                    ret = ret.split(' ').join(' ' + joinOn + ' ');
                }
            }

            if (ret.length > truncateLength) {
                // Truncate the string just until the maximum length allowed
                ret = ret.substring(0, truncateLength);
                // Go back to the end of the previous word, so we don't
                // truncate in the middle of a word
                ret = ret.replace(/\w+$/, '');
            }

            // We need to remove AND & OR if they are the first or last words
            // of the querystring. Otherwise we get a 500 exception
            ret = $.trim(ret);
            for (var i = 0, j = removeArray.length; i < j; i++) {
                var startItem = removeArray[i];
                if (ret.substr(0, startItem.length) === startItem) {
                    ret = ret.substring(startItem.length, ret.length);
                }
                var endItem = removeArray[i];
                if (ret.substr(-endItem.length) === endItem) {
                    ret = ret.substring(0, ret.length - endItem.length);
                }
            }

            ret = $.trim(ret);
            if (ret.length === 0) {
                ret = '*';
            }

            return ret;
        }