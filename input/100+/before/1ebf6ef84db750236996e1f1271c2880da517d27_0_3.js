function(msg) {
            var data = JSON.parse(msg.data);
            if (data.type == 'serverInfo'){
                console.log("Server info: "+data.startTime+" "+draft.loadTime);
                if (draft.loadTime < data.startTime)
                    location.reload(true);
            }
            if (data.type == 'sync'){
                draft.objects = data.objects;
                var usercount = document.getElementById('users');
//                usercount.innerHTML= data.usercount;
                refreshFG(); 

            }
            if (data.type == 'stats'){
//                console.log(data)
            }
            
        }