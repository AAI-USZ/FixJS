function(commits) {

                var commit_data = commits.data;

                var most_recent_commit = 0;
                $.each(commit_data, function(commit_counter) {
                    if(commit_data[most_recent_commit].commit.committer.date < commit_data[commit_counter].commit.committer.date) {
                        most_recent_commit = commit_counter;
                    }
                });

                var recentCommit = commit_data[most_recent_commit]

                $("#github_commit_message").replaceWith(
                '<div id="github_commit_message" style="display:none;">' +
                '<strong>nickknw/'+repo_name+': </strong>' + 
                recentCommit.commit.message + '<span class="indent faded">' +
                new Date(recentCommit.commit.committer.date).toDateString().slice(4) +
                '</span></div>');

                $('#git_url').attr('href', 'http://github.com' + recentCommit.url);
                $('#github_commit_message').fadeIn();
            }