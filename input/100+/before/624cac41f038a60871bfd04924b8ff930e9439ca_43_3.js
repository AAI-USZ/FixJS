function(){
            var dropdownSelection = $("#savecontent_select option:selected", $rootel);
            if (dropdownSelection.val() === "new_collection"){
                var contentToAdd = [];
                $.each(contentObj.data, function(index, item){
                    contentToAdd.push(item.body);
                });
                hideSavecontent();
                $(window).trigger("create.collections.sakai", [contentToAdd]);
            } else if (!dropdownSelection.is(":disabled") && dropdownSelection.val()) {
                saveContent(dropdownSelection.val());
            }
        }