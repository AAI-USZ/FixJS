function($) {

  // prevent pjax from jumping to top, see github#60
  $.pjax.defaults.scrollTo = false;
  $.pjax.defaults.timeout = 5000;
  $.pjax.defaults.maxCacheLength = 0;

  confDialog = function(event) {
    if(!confirm($(this).attr('data-confirm')))
    {
      event.stopImmediatePropagation();
      return false;
    }
  };

  // confirm dialog behavior for links and buttons
  $(document).on('click', 'a[data-confirm], button[data-confirm], input[data-confirm]', confDialog);
  // confirm dialog behavior for forms
  $(document).on('submit', 'form[data-confirm]', confDialog);

  // install pjax handlers, see defunkt/jquery-pjax#142
  $(document).on('click', '[data-pjax-container] a, a[data-pjax]', function(event) {
    var self = $(this), container;

    if(event.isDefaultPrevented())
    {
      return;
    }

    if(self.is('a[data-pjax]'))
    {
      container = self.attr('data-pjax');
    }
    else
    {
      container = self.closest('[data-pjax-container]').attr('data-pjax-container');
    }

    if (container !== 'false') {
      return $.pjax.click(event, container);
    }
  });

  // add pjax error handling
  $(document)
    .on('pjax:error', function(e, xhr, err) {
      // user not authorized -> redirect to login page
      if (xhr.status === 401)
      {
         window.location = 'index.php?page=login';
         return false;
      }
      $('#rex-message-container').text('Something went wrong: ' + err);
    })
    .on('pjax:success', function(e, data, status, xhr, options) {
      var paramUrl = options.url.split('?'), page, subpage;

      $.each(paramUrl[1].split('&'), function(_, value) {
        var parts = value.split('=');
        if(parts[0] == 'page')
          page = parts[1];
        else if(parts[0] == 'subpage')
          subpage = parts[1];
      });

      $('.rex-navi-main .rex-active').removeClass('rex-active');

      // activate main-page
      $('#rex-navi-page-' + page).addClass('rex-active');
      $('#rex-navi-page-' + page + ' > a').addClass('rex-active');
      // activate sub-page
      $('#rex-navi-page-' + page + ' li > a[href$=\'subpage='+ subpage +'\']').addClass('rex-active')
        .parent('li').addClass('rex-active');
    })
    .on('pjax:start', function() { $('#rex-ajax-loader').show(); })
    .on('pjax:end',   function() { $('#rex-ajax-loader').hide(); });
}