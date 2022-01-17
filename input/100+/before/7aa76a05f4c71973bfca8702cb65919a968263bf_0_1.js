function entry() {
    var $article = $('article.entry');
    if ($article.length !== 1) return;

    window.disqus_url =
      $('link[rel="canonical"]').attr('href') || canonicalize(location.href);
    window.disqus_identifier = identifier(disqus_url);
    window.disqus_title      = $article.find('.entry-title-link:first').text();
    console.log(disqus_url, disqus_identifier, disqus_title);

    var $disqus_thread = $('<div>')
      .attr('id', 'disqus_thread')
      .insertAfter($article.find('.comment-box:last'));

    if (/^#?disqus_thread$/.test(location.hash)) {
      $(window).scrollTop($disqus_thread.offset().top);
    }

    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  }