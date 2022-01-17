function(section){
        if (section === 'interesting') {
            var reason = 'good';
            var tag_store = interestingTags;
        } else if (section === 'ignored') {
            var reason = 'bad';
            var tag_store = ignoredTags;
        } else if (section === 'subscribed') {
            var reason = 'subscribed';
            var tag_store = subscribedTags;
        } else {
            return;
        }
        $('.' + section + '.tags.marked-tags .tag-left').each(
            function(i,item){
                var tag = new Tag();
                tag.decorate($(item));
                tag.setDeleteHandler(function(){
                    unpickTag(
                        tag_store,
                        tag.getName(),
                        reason,
                        true
                    )
                });
                if (tag.isWildcard()){
                    tag.setHandler(function(){
                        handleWildcardTagClick(tag.getName(), reason)
                    });
                }
                tag_store[tag.getName()] = $(item);
            }
        );
    }