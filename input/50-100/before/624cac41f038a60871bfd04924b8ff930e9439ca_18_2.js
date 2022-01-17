function(){
                acceptRequest($(this)[0].id.split("contacts_add_to_contacts_")[1]);
                $(this).parents('.contacts_item').remove();
                uncheckAll();
            }