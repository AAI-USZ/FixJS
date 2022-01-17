function(){
            $(window).bind("hashchanged.participants.sakai", handleHashChange);

            $(".participants_widget .s3d-search-button").unbind("click").bind("click", function(){
                currentPage = 1;
                $.bbq.pushState({"pq": $.trim($participantsSearchField.val())});
            });
            $participantsSearchField.unbind("keyup").bind("keyup", function(ev) {
                if (ev.keyCode === 13) {
                    $.bbq.pushState({"pq": $.trim($participantsSearchField.val())});
                }
            });
            $participants_sort_by.unbind("change").bind("change", function(){
                $.bbq.pushState({"psb": $participants_sort_by.val()});
            });
            $participantsSelectAll.unbind("click").bind("click", checkAll);
            $(participantsListParticipantCheckbox, rootel).live("click", setSendSelectedMessageAttributes);

            $(".participants_accept_invitation").live("click", function(ev){
                var userid = $(this).attr("sakai-entityid");
                sakai.api.User.acceptContactInvite(userid, function(){
                    $('.participants_accept_invitation').each(function(index) {
                        if ($(this).attr("sakai-entityid") === userid){
                            $(this).hide();
                        }
                    });
                });
            });

            $(window).bind("sakai.addToContacts.requested", function(ev, userToAdd){
                $('.sakai_addtocontacts_overlay').each(function(index) {
                    if ($(this).attr("sakai-entityid") === userToAdd.uuid){
                        $(this).hide();
                    }
                });
            });

            $(participantsShowList, rootel).click(function(){
                $.bbq.pushState({"ls": "list"});
            });

            $(participantsShowGrid, rootel).click(function(){
                $.bbq.pushState({"ls": "grid"});
            });

            $('.addpeople_init', rootel).on('click', function() {
                $(document).trigger('init.addpeople.sakai', {
                    editingGroup: true
                });
            });
        }