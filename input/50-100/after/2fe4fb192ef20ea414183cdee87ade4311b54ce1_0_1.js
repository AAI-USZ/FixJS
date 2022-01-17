function(db) {
      $('#topbar').html(
        '<a href="#/">Overview</a><strong id="current-db"><a href="#/'+ db +'" class="db-name">' +
          db +'</a> <button class="down">&#160;</button></strong>' +
          '<ul class="tabs"><li class="all-docs"><a href="#/' +
          encodeURIComponent(db) + '/_all_docs">All Documents</a></li>' +
          '<li class="design-docs"><a href="#/' + encodeURIComponent(db) +
          '/_all_docs?startkey=%22_design/%22&endkey=%22_design0%22">Design Docs</a></li>' +
          '<li class="changes"><a href="#/' + encodeURIComponent(db) + '/_changes">Changes</a></li></ul>');
    }