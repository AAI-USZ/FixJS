Each of these files contain the commit csv in a monthly breakdown. 
The csv files contain the following columns:

 - `date`: the date of the commit
 - `event_type`: the event type in GitHub API
 - `sha`: commit sha
 - `msg`: commit message (already filtered, so it should contain at least one of the following keywords: `{fix, solve, bug, issue, problem, error}`)
 - `url`: the GitHub API url of the commit 
