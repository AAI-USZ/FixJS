function(issue, totalIssues) {
        var summary       = _doc.createElement('div');
        summary.className = _prefix + 'summary-detail';

        var leftPane       = _doc.createElement('div');
        leftPane.className = _prefix + 'summary-left';

        var rightPane       = _doc.createElement('div');
        rightPane.className = _prefix + 'summary-right';

        // Start lineage.
        var lineage       = _doc.createElement('ol');
        lineage.className = _prefix + 'lineage';

        var lineageHomeItem       = _doc.createElement('li');
        lineageHomeItem.className = _prefix + 'lineage-item';

        var lineageHomeLink       = _doc.createElement('a');
        lineageHomeLink.className = _prefix + 'lineage-link';
        lineageHomeLink.href      = 'javascript:';

        var lineageHomeSpan       = _doc.createElement('span');
        lineageHomeSpan.innerHTML = 'Home';
        lineageHomeLink.appendChild(lineageHomeSpan);

        lineageHomeLink.onmousedown = function() {
            self.run(_standard, _sources, _options);
        };

        // Back to Report item.
        var lineageReportItem       = _doc.createElement('li');
        lineageReportItem.className = _prefix + 'lineage-item';

        var lineageReportLink       = _doc.createElement('a');
        lineageReportLink.className = _prefix + 'lineage-link';
        lineageReportLink.href      = 'javascript:';
        lineageReportLink.innerHTML = 'Report';
        lineageReportLink.setAttribute('title', 'Back to Report');

        lineageReportLink.onmousedown = function() {
            var list = _doc.querySelectorAll('.HTMLCS-inner-wrapper')[0];
            list.style.marginLeft = '0px';
            list.style.maxHeight  = null;

            summary.style.display = 'none';
            var listSummary = _doc.querySelectorAll('.HTMLCS-summary')[0];
            listSummary.style.display = 'block';
        };

        // Issue Count item.
        var lineageTotalsItem       = _doc.createElement('li');
        lineageTotalsItem.className = _prefix + 'lineage-item';
        lineageTotalsItem.innerHTML = 'Issue ' + issue + ' of ' + totalIssues;

        lineageHomeItem.appendChild(lineageHomeLink);
        lineageReportItem.appendChild(lineageReportLink);
        lineage.appendChild(lineageHomeItem);
        lineage.appendChild(lineageReportItem);
        lineage.appendChild(lineageTotalsItem);
        leftPane.appendChild(lineage);

        var buttonGroup       = _doc.createElement('div');
        buttonGroup.className = _prefix + 'button-group';

        var prevButton = buildSummaryButton(_prefix + 'button-previous-issue', 'previous', 'Previous Issue', function(target) {
            var newIssue = Number(issue) - 1;

            if (newIssue >= 1) {
                setCurrentDetailIssue(newIssue - 1);
                wrapper = summary.parentNode;
                var newSummary = buildDetailSummarySection(newIssue, totalIssues);
                wrapper.replaceChild(newSummary, summary);
                newSummary.style.display = 'block';

                var issueList = _doc.querySelectorAll('.HTMLCS-issue-detail-list')[0];
                issueList.firstChild.style.marginLeft = (parseInt(issueList.firstChild.style.marginLeft, 10) + 300) + 'px';
                pointToIssueElement(newIssue - 1);
            }//end if
        });

        var nextButton = buildSummaryButton(_prefix + 'button-next-issue', 'next', 'Next Issue', function(target) {
            var newIssue = Number(issue) + 1;

            if (newIssue <= _messages.length) {
                setCurrentDetailIssue(newIssue - 1);
                wrapper = summary.parentNode;
                var newSummary = buildDetailSummarySection(newIssue, totalIssues);
                wrapper.replaceChild(newSummary, summary);
                newSummary.style.display = 'block';

                var issueList = _doc.querySelectorAll('.HTMLCS-issue-detail-list')[0];
                issueList.firstChild.style.marginLeft = (parseInt(issueList.firstChild.style.marginLeft, 10) - 300) + 'px';
                pointToIssueElement(newIssue - 1);
            }//end if
        });

        if (issue === 1) {
            prevButton.className += ' disabled';
        } else if (issue === totalIssues) {
            nextButton.className += ' disabled';
        }

        buttonGroup.appendChild(prevButton);
        buttonGroup.appendChild(nextButton);
        rightPane.appendChild(buttonGroup);

        summary.appendChild(leftPane);
        summary.appendChild(rightPane);

        return summary;
    }