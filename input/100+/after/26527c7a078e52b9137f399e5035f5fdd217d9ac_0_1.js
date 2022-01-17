function() {
        console.log("access_token: " + localStorage.getItem('access_token'));
        if(!localStorage.getItem('access_token')) {
          return true;
        }

        var cur = parseInt((new Date().getTime()) / 1000);
        var expires_in = localStorage.getItem('expires_in');
        var last_login_time = localStorage.getItem('last_login_time');
        console.log("cur: " + cur + ", expires_in: " + expires_in + ", last_login_time: " + last_login_time);
        if(cur - last_login_time > expires_in - 60) {
            return true;
        }

        return false;
    }