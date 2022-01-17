function(el) {
            clickedEl = $(this);
            idArr = clickedEl.attr('data-entityid');
            if (idArr.length > 1 && !$.isArray(idArr)) {
                idArr = idArr.split(',');
            }

            contentObj.memberOfGroups = $.extend(true, {}, sakai.api.Groups.getMemberships(sakai.data.me.groups, true));
            contentObj.context = $(el.currentTarget).attr('data-entitycontext') || false;

            var batchRequests = [];
            $.each(idArr, function(i, id) {
                batchRequests.push({
                    'url': '/p/' + id + '.2.json',
                    'method': 'GET'
                });
            });
            sakai.api.Server.batch(batchRequests, function(success, data) {
                if (success) {
                    $.each(data.results, function(i, content) {
                        data.results[i].body = $.parseJSON(data.results[i].body);
                    });
                    contentObj.data = data.results;
                    selectAlreadyInGroup();
                }
            }, false);
        }