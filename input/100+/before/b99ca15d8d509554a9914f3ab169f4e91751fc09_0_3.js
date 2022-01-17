function(e) { //处理动态载入节点

            var target = e.target;

            var tagName = target.tagName;

            var classList = target.classList;

            if(tagName == 'DL' && classList.contains('feed_list')) {

                return wbp.Filter.filterFeed(target);

            } else if(tagName === 'DIV' && classList.contains('feed_lists')) {

                return wbp.Filter.filterFeeds();

            }

        }