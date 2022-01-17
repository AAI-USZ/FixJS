function highlightCurrentPage() {
    var base_url = $("base").attr("href");
    $(".current-page").removeClass('current-page');
    $(".current-section").removeClass('current-section');

    if (base_url == '/')
      currentPage = window.location.pathname;
    else
      currentPage = window.location.toString();

    currentPage = currentPage.slice(base_url.length);
    $('a[href="' + currentPage + '"]').parent().addClass('current-page');

    currentSideBarSection = null;
    if ( $('.current-page').hasClass('sidebar-subsection-header') ) {
      currentSideBarSection = $('.current-page').next();
    }
    else {
      currentSideBarSection =
        $('.current-page').closest('.sidebar-subsection-contents');
    }
    if ($(currentSideBarSection).length == 0)
      currentSideBarSection = $('#default-section-contents');

    $('.sidebar-subsection-contents').hide();
    $('.always-show').show();
    $(currentSideBarSection).parent().addClass('current-section');
    $(currentSideBarSection).show();
  }