function(response){
        //console.log(response.ignorator);
        //console.log(response.ignorator.data.users);
        ignoratorData = response.ignorator.data;
        //document.getElementById('info_test_display').innerHTML = response.scope;
        if(response.ignorator.data.users){
            for(var i in response.ignorator.data.users){
                //console.log('user', i);
                insert = document.createElement('div');
                insert.className = 'user_ignore';
                var show = document.createElement('span');
                show.title = 'show ' + i + ' on this page';
                show.className = 'show_hidden';
                show.innerHTML = 'x';
                var current = response.ignorator.data.users[i];
                show.addEventListener('click', function(evt){ showHidden(evt.target.parentNode.getElementsByClassName('i_data')[0].innerHTML, evt.target); });
                insert.innerHTML = '<span class="rm_num">' + response.ignorator.data.users[i].total + '</span><span class="i_data">' + i + '</span>';
                insert.insertBefore(show, null);
                document.getElementById('js_insert').insertBefore(insert, null);
            }
        }
        if(response.ignorator.data.keywords){
            for(var i in response.ignorator.data.keywords){
                //console.log('keyword', i);
                insert = document.createElement('div');
                insert.className = 'keyword_ignore';
                insert.innerHTML = '<span class="rm_num">' + response.ignorator.data.keywords[i].total + '</span>' + i;
                document.getElementById('js_insert').insertBefore(insert, null);
            }
        }
    }