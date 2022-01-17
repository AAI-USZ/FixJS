function (a, b) {
            if (a['sakai:group-title'].toLowerCase() > b['sakai:group-title'].toLowerCase()) {
                return 1;
            } else {
                if (a['sakai:group-title'].toLowerCase() === b['sakai:group-title'].toLowerCase()) {
                    return 0;
                } else {
                    return -1;
                }
            }
        }