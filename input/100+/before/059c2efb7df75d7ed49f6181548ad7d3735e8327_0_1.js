function(issue) {
        
          if ((typeof(issue.assignee) != 'undefined') && (issue.assignee != null)) {
            console.log(issue.assignee);
            userList.push(issue.assignee.login);
            
            userList = _.uniq(userList);
            
            if (typeof(mostOpenIssues[issue.assignee.login]) != 'undefined') {
              mostOpenIssues[issue.assignee.login].open_issues += 1;
            } else {
              mostOpenIssues[issue.assignee.login] = _.extend(issue.assignee, {
                username: issue.assignee.login,
                open_issues: 1
              });
            }

          }

          return issue;

        }