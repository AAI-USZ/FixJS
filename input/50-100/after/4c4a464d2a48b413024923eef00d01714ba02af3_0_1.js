function() {
  octopress.wrapFlashVideos();
  octopress.testFeature(['maskImage', 'transform']);
  octopress.flashVideoFallback();
  octopress.addCodeLineNumbers();
  octopress.addMobileNav();
  octopress.addSidebarToggler();
  octopress.twitter.getFeed('#tweets')
  octopress.github.showRepos('#gh_repos');
  $(".fancybox").fancybox({
    nextEffect  : 'fade',
    prevEffect : 'fade'
  });
}