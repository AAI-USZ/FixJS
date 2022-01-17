function(id){

        var listItems = playlistList.find('li').removeClass('current');

        var removeIcons = listItems.find('.remove').css('cursor', 'pointer').off('click').click(removePlaylist);

        removeIcons.find('svg path').attr('fill', '#000');



        var selectedListItem = $('#' + id).addClass('current');

        var selectedRemoveIcon = selectedListItem.find('.remove').css('cursor', 'default');

        selectedRemoveIcon.find('svg path').attr('fill', '#808080').off('click');



        Player.selectPlaylist(id);

    }