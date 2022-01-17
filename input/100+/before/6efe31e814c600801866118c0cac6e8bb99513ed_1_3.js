function(guid){
        KIJ2013.setActionBarUp(displayEventsList);
        KIJ2013.sql('SELECT title,date,remind,category,description FROM `' +
                TABLE_NAME + '` WHERE guid = ? LIMIT 1', [guid],
                function(tx, result){
            if(result.rows.length == 1)
            {
                var item = result.rows.item(0),
                    content = $('<div/>').css({"padding": "10px"}),
                    date = new Date(item.date*1000);
                KIJ2013.setActionBarTitle(item.title)
                $('#body').empty();
                $('<h1/>').text(item.title).appendTo(content);
                $('<p/>').addClass("date-text")
                    .text(date.toLocaleString())
                    .appendTo(content);
                $('<a/>')
                    .addClass('button')
                    .addClass(item.remind ? 'selected' : '')
                    .text('Remind')
                    .click({guid:guid},onClickRemind)
                    .appendTo(content);
                $('<p/>')
                    .attr('id', "remind-text")
                    .text(item.remind?
                        "You will be reminded about this event.":
                        "You will not be reminded about this event")
                    .appendTo(content);
                $('<p/>')
                    .addClass('category')
                    .text(item.category)
                    .appendTo(content);
                $('<p/>')
                    .text(item.description)
                    .appendTo(content);
                $('#body').append(content);
                window.scrollTo(0, 1);
            }
        });
    }