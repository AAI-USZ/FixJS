function (user, repo, number) {
        if ( !(this instanceof gh.issue) )
            return new gh.commit(user, repo, number);
        this.user = user;
        this.repo = repo;
        this.number = number;
    }