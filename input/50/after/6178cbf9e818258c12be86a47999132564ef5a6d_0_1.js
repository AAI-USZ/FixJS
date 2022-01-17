function () {
            if (++counter === len) {
                SyntaxHighlighter.highlight();
                window.SyntaxHighlighterLoading = false;
            } else {
                load(arr[counter], callBack);
            }
        }