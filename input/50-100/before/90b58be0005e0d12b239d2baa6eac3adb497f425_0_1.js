function(repo) {

        var repository =    '<article>' +
                                '<div>' +
                                    '<h2><a href="' + repo.html_url + '">' + repo.name + '</a></h2>' +
                                    '<p>' + repo.description + '</p>' +
                                    '<a href="' + repo.homepage + '">' + repo.homepage + '</a>' +
                                '</div>' +
                            '</article>'; 

        $(this.element).append(repository);

    }