function displayStream(toPage, options) {
    console.log('inizia');
    FB.init({
        appId: "366089376758944",
        nativeInterface: CDV.FB,
        useCachedDialogs: false,
    });
    FB.getLoginStatus(function(response) {
        console.log('getLogin');
        if (response.status == 'connected') {
            var pmFriends = new Array();
            console.log(response.authResponse.expiresIn);
            FB.api('/me/friends',{fields: 'installed'}, function(res) {
                if (res.error) console.log(res.error);
                else{
                console.log('facebook callback');
                console.log(res.data);
                for (var i = 0; i < res.data.length; i++) {
                    if (typeof res.data[i].installed != "undefined") {
                        console.log('trovato');
                        pmFriends.push(res.data[i]);
                    }
                }
                var friendsParameter = JSON.stringify(pmFriends);

                // $.ajax({
                //     url:endpoint+"/users/"+ user.id + "/friends",
                //     type:"POST",
                //     data: {friends:friendsParameter}
                // });
                console.log(friendsParameter);
                $.post(endpoint+"/users/"+ user.id + "/friends", {friends:friendsParameter}, function(data){
                    console.log(data);
                });
                // response.data.forEach(function(item) {
                //     if (typeof item.installed != "undefined") {
                //         pmFriends.push(item.id);
                //         console.log(item);
                //     }
                // });
                }
            });

        } else console.log(response.status);
    }, true);
}