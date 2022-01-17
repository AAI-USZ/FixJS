function(index, array) {
            var temp = {};
            var item = array[index];
            temp.id = item.id;
            if (temp.id && temp.id == 'subnavigation_hr') {
                temp = 'hr';
            } else {
                if (sakai.data.me.user.anon && item.anonUrl) {
                    temp.url = item.anonUrl;
                } else {
                    temp.url = item.url;
                    if (item.append) {
                        temp.append = item.append;
                    }
                }
                temp.label = sakai.api.i18n.getValueForKey(item.label);
                if (item.cssClass) {
                    temp.cssClass = item.cssClass;
                }
            }
            return temp;
        }