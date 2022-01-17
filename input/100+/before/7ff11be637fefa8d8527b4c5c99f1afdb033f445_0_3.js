function() {
            if (_page < totalPages) {
                _page++;
                if (_page === totalPages) {
                    next.className += ' ' + _prefix + 'disabled';
                }
            }

            prev.className    = prev.className.replace(new RegExp(' ' + _prefix + 'disabled'), '');
            pageNum.innerHTML = 'Page ' + _page + ' of ' + totalPages;

            var issueList = _doc.querySelectorAll('.HTMLCS-issue-list')[0];
            issueList.style.marginLeft = ((_page - 1) * -300) + 'px';
        }