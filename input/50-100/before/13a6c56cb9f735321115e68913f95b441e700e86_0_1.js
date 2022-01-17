function (error, oauth_token, oauth_token_secret, results) {
        if (error) {
            console.log(error);
            res.send("yeah no. didn't work.")
        }
        else {
            req.session.oauth = {
                token : oauth_token,
                token_secret : oauth_token_secret
            };
            res.redirect('https://trello.com/1/OAuthAuthorizeToken?oauth_token=' + oauth_token)
        }
    }