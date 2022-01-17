function(result) {
                $(rootNode).empty();
                appendBlogPost(rootNode, result);
                $().toastmessage('showNoticeToast', 'some message here');
            }