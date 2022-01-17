function(reason){
        var to_target = interestingTags;
        var from_target = ignoredTags;
        var to_tag_container;
        if (reason === 'bad') {
            var input_sel = '#ignoredTagInput';
            to_target = ignoredTags;
            from_target = interestingTags;
            to_tag_container = $('div .tags.ignored');
        } else if (reason === 'good') {
            var input_sel = '#interestingTagInput';
            to_tag_container = $('div .tags.interesting');
        } else if (reason === 'subscribed') {
            var input_sel = '#subscribedTagInput';
            to_target = subscribedTags;
            to_tag_container = $('div .tags.subscribed');
        } else {
            return;
        }

        var tagnames = getUniqueWords($(input_sel).attr('value'));

        if (reason !== 'subscribed') {//for "subscribed" we do not remove
            $.each(tagnames, function(idx, tagname) {
                if (tagname in from_target) {
                    unpickTag(from_target, tagname, reason, false);
                }
            });
        }

        var clean_tagnames = [];
        $.each(tagnames, function(idx, tagname){
            if (!(tagname in to_target)){
                clean_tagnames.push(tagname);
            }
        });

        if (clean_tagnames.length > 0){
            //send ajax request to pick this tag

            sendAjax(
                clean_tagnames,
                reason,
                'add',
                function(){ 
                    renderNewTags(
                        clean_tagnames,
                        reason,
                        to_target,
                        to_tag_container
                    );
                    $(input_sel).val('');
                    liveSearch.refresh();
                }
            );
        }
    }