function()
    {
        KIJ2013.setActionBarUp('index.html');
        KIJ2013.setActionBarTitle('Events');
        KIJ2013.sql('SELECT guid,title,date,category,remind FROM `' +
                TABLE_NAME + '` WHERE `date` > ? ORDER BY `date` ASC LIMIT 30',
                [(new Date())/1000], function(tx, result){
            var len = result.rows.length,
                list = $('<ul/>').attr('id', "event-list").addClass("listview"),
                month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                i=0;
            if(len)
            {
                for(;i<len;i++)
                {
                    var row = result.rows.item(i),
                        guid = row.guid,
                        li = $('<li/>'),
                        item = $('<a/>').attr('id', guid),
                        date = new Date(row.date*1000),
                        datetext = $('<p/>')
                        .addClass('date-text')
                        .text(date.getDate() + " " + month[date.getMonth()]),
                        text = $('<p/>')
                        .addClass('title')
                        .text(row.title),
                        remind = $('<a/>')
                        .addClass('remind-btn button')
                        .addClass(row.remind ? 'selected' : '')
                        .text('Remind')
                        .click({guid:guid},onClickRemind),
                        category = $('<p/>')
                        .addClass('category')
                        .text(row.category);
                    item.data('guid', row.guid);
                    item.click(onClickEventItem);
                    item.append(datetext).append(text).append(remind).append(category);
                    li.append(item);
                    list.append(li);
                }
                $('#body').empty().append(list);
            }
            else
                KIJ2013.showLoading();
        });
    }