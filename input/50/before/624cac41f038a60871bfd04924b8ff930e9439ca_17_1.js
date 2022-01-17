function(i, user) {
                if (user['sakai:pool-content-created-for']) {
                    batchRequests.push({
                        'url': '/~' + user['sakai:pool-content-created-for'] + '/public/authprofile.profile.json',
                        'method':'GET'
                    });
                }
            }