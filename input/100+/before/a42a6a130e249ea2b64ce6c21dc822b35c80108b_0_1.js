function (Projects, Github) {
	'use strict';
	
	var user = 'craigmaslowski',
		githubOptions = { user: user },
		githubRepos,
		githubUser,
		projectsView;

	app.start();

	projectsView = new Projects.Views.Projects({ el: '#content' });
	githubUser = new Github.Models.GithubUser({}, { user: user });
	githubRepos = new Github.Collections.GithubRepos([]);
	githubUser.options = githubOptions;
	githubRepos.options = githubOptions;

	$.when(
		githubRepos.fetch(),
		githubUser.fetch()
	).done(function () {
		projectsView.repos = githubRepos;
		projectsView.user = githubUser;
		projectsView.render();

	}).fail(function () {
		$('#projects .loading').hide();
		$('#static-projects').show();
	});
}