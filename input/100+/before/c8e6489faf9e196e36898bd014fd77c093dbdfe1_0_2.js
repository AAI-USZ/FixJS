function() {
        var menuID = $(this).find('id').text();
        var titolo = $(this).find('title').text();
        var url = $(this).find('url').text();
        var link_markup = '<td class="headitem"><a href="'+url+'" class="menu" id="'+menuID+'">'+titolo+'</a></td>';

        $(link_markup).appendTo('#menuBar');
      }