function(i, user) {
                if (user['sakai:pool-content-created-for']) {
                    usersToFetch.push(user['sakai:pool-content-created-for']);
                }
            }