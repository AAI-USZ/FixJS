function(){
                var $pendingList = $(this).parents('.contacts_item').parent();
                acceptRequest($(this)[0].id.split("contacts_add_to_contacts_")[1]);
                $(this).parents('.contacts_item').remove();
                uncheckAll();
                if (!$pendingList.children().length) {
                    $(contactsInvited, $rootel).hide();
                }
            }