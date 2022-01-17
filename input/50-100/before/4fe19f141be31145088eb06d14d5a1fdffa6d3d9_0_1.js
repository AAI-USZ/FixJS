function(){
        $('#sidebar .record_relation.selected').removeClass('selected');
        if ($(this).hasClass('selected')){
            sidebarPopup.hide()
        } else {
            $(this).addClass('selected')
            sidebarPopup.html($(this).attr('related_records'))
            sidebarPopup.show();
        }
        event.stopPropagation();
    }