function () {
            if (++counter === len) {
                SyntaxHighlighter.highlight();
            } else {
                load(arr[counter], callBack);
            }
        }