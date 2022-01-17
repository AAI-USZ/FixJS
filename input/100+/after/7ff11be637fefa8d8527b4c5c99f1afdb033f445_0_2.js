function() {
            if (_page > 1) {
                _page--;
                if (_page === 1) {
                    prev.className += ' ' + _prefix + 'disabled';
                }
            }

            if (totalPages > 1) {
                next.className = next.className.replace(new RegExp(' ' + _prefix + 'disabled'), '');
            }

            pageNum.innerHTML = 'Page ' + _page + ' of ' + totalPages;

            var issueList = _doc.querySelectorAll('.HTMLCS-issue-list')[0];
            issueList.style.marginLeft = ((_page - 1) * -300) + 'px';
        }