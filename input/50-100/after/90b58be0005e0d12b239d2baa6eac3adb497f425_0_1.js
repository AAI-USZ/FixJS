function(repo) {
        // test if homepage begins with http or https
        repo.homepage = ( repo.homepage && !( /^(http|https):\/\//.test( repo.homepage ) ) ) ? "http://" + repo.homepage : repo.homepage;          

        var repository =    '<article>' +
                                '<div>' +
                                    '<h2><a href="' + repo.html_url + '">' + repo.name + '</a></h2>' +
                                    '<p>' + repo.description + '</p>' +
                                    '<a href="' + repo.homepage + '" target="_blank">' + repo.homepage + '</a>' +
                                '</div>' +
                            '</article>'; 

        $(this.element).append(repository);

    }