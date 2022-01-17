function(tx, result){
                var len = result.rows.length;
                if(len)
                {
                    var list = $('<ul/>').attr('id',"news-list").addClass("listview");
                    for(var i=0;i<len;i++)
                    {
                        var row = result.rows.item(i);
                        var li = $('<li/>');
                        var item = $('<a/>').attr('id', row.guid).text(row.title);
                        item.data('guid', row.guid);
                        item.click(onClickNewsItem);
                        li.append(item);
                        list.append(li);
                    }
                    $('#body').empty().append(list);
                }
                else
                    $('#body').append('<div>Loading News</div>');
            }