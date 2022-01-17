function buildPager() {
    if (maxPage() == 1) {
      return; 
    }
    
    var html = '';
    var backHtml = '';
    var forwardHtml = '';
    var hrefVoid = 'href="javascript:void(0);"'
    
    var firstClass = '';
    var lastClass = '';
    if (_index == 0) {
      firstClass = ' gp_local_disabled';
    }
    if (_index >= maxPage() - 1) {
      lastClass = ' gp_local_disabled';
    }
    var numbersData = numbers(hrefVoid);
    html = numbersData.html;
    backHtml += '<li class="' + _class.previous + firstClass + '"><a ' + hrefVoid + '><span></span>' + _labels.previous + '</a>\n';
    backHtml += '<li class="' + _class.first + firstClass + '"><a ' + hrefVoid + '><span>' + _labels.first + '</span></a>\n';
    if (numbersData.start > 0) {
      backHtml += '<li class="fontys_pager_ellipsis">...</li>\n';
    }
    if (numbersData.end < maxPage()) {
      forwardHtml += '<li class="fontys_pager_ellipsis">...</li>\n';
    }
    forwardHtml += '<li class="' + _class.last + lastClass + '"><a ' + hrefVoid + '><span>' + _labels.last + '</span></a>\n';
    forwardHtml += '<li class="' + _class.next + lastClass + '"><a ' + hrefVoid + '>' + _labels.next + '<span></span></a>\n';
    html = '<ul>' + backHtml + html + forwardHtml + '</ul>';
    
    _pagerContainer.html(html);
    setEvents();
  }