function default_error_handler(url, xhr, textStatus, errorThrown) {
        var msg = '';
        var tech_info = '';
        if (xhr.status in self.http_code_msg_table) {
            if (xhr.status != 403) {
                msg = self.http_code_msg_table[xhr.status];
            } else {
                if (url.indexOf('favorites/create/') !== - 1) {
                    msg = self.http_code_msg_table[403]['fav'];
                } else if (url.indexOf('statuses/retweet/') !== - 1) {
                    msg = self.http_code_msg_table[403]['retweet'];
                } else if (url.indexOf('statuses/update.json') !== - 1) {
                    msg = self.http_code_msg_table[403]['update'];
                } else {
                    msg = self.http_code_msg_table[403]['unknown'];
                }
            }
            tech_info = 'HTTP Code:' + xhr.status + '\nDetails:' + xhr.statusText + '\nURL:' + url;
        } else {
            msg = 'Unknow Error';
            tech_info = 'HTTP Code:' + xhr.status + '\nReason:' + xhr.statusText + '\nURL:' + url;
        }
        switch (self.default_error_method) {
        case 'notify':
            if (xhr.status !== 0) {
                hotot_notify('Ooops, An Error Occurred!', msg + '\n' + tech_info, null, 'content');
            } else {
                toast.set('Lost Connection').show(1);
            }
            break;
        case 'dialog':
            ui.ErrorDlg.alert('Ooops, An Error Occurred!', msg, tech_info);
            break;
        case 'toast':
            toast.set('Error #' + xhr.status + ': ' + msg).show();
            break;
        default:
            break;
        }
        hotot_log('Error #' + xhr.status + ',' + xhr.statusText, msg + ' ' + url);
        return;
    }