function(data) {

      var sev_id = '#' + service;

      data.response.alerts.severityCounts.normal += data.response.alerts.severityCounts.inform;

      $.each(data.response.alerts.severityCounts, function(sev, count) {
        $(sev_id + "-" + sev).text(count);

        switch (count) {
          case 0: $(sev_id + "-" + sev).removeClass(sev).addClass('zero'); break;
          default: $(sev_id + "-" + sev).addClass(sev).removeClass('zero');
        }

      });

        if (data.response.alerts.severityCounts.critical > 0) {
          scolor = 'red';
        } else if (data.response.alerts.severityCounts.major > 0) {
          scolor = 'orange';
        } else if (data.response.alerts.severityCounts.minor > 0) {
          scolor = 'yellow';
        } else if (data.response.alerts.severityCounts.warning > 0) {
          scolor = 'dodgerblue';
        } else {
          scolor = 'lime';
        }
      $(sev_id + "-status").css('background-color',scolor);

      var rows ='';
      $.each(data.response.alerts.alertDetails, function(i, ad) {

        var historydata = '<td colspan="2"><b>History </b>', graphsdata = tagsdata = '';

        if (ad.history) {
          var reverseHistory = ad.history.reverse();
          $.each(reverseHistory, function (y, hist) {
            if (hist.event) {
              historydata += '<hr/>' +
                          '<table class="table table-condensed table-striped">' +
                          '<tr><td><b>Event</b></td><td>' + hist.event + '</td></tr>' +
                          '<tr><td><b>Severity</b></td><td>' + sev2label(hist.severity) + '</td></tr>' +
                          '<tr><td><b>Alert ID</b></td><td>' + hist.id + '</td></tr>' +
                          '<tr><td><b>Create Time</b></td><td>' + date2str(hist.createTime) + '</td></tr>' +
                          '<tr><td><b>Receive Time</b></td><td>' + date2str(hist.receiveTime) + '</td></tr>' +
                          '<tr><td><b>Text</b></td><td>' + hist.text + '</td></tr>' +
                          '<tr><td><b>Value</b></td><td>' + hist.value + '</td></tr>' +
                          '</table>' +
                        '';
            }
            if (hist.status) {
              historydata += '<hr/>' +
                          '<table class="table table-condensed table-striped">' +
                          '<tr><td><b>Status</b></td><td><span class="label">' + hist.status + '</span></td></tr>' +
                          '<tr><td><b>Update Time</b></td><td>' + date2str(hist.updateTime) + '</td></tr>' +
                          '</table>' +
                        '';
            }
          });
          historydata += '</td>'
        }

        if (ad.tags) {
          tagsdata += '';
          $.each (ad.tags, function(y, tag) {
            tagsdata += '<span class="label">' + tag + '</span> ';
          });
        }

        if (ad.graphs) {
          graphsdata += '';
          $.each (ad.graphs, function(y, graph) {
            graphsdata += '<a href="' + graph + '" target="_blank">Graph ' + y + '</a> ';
          });
          graphsdata += '</ul>';
        }

        switch (ad.severity) {
          case 'CRITICAL': label='label-important'; break;
          case 'MAJOR': label='label-warning'; break;
          case 'MINOR': label='label-warning'; break;
          case 'WARNING': label='label-info'; break;
          default: label='label-success';
        }

        rows += '<tr class="' + service + ' latest ' + ad.severity + ' ' + ad.status + '">' +
                  '<td class="ad-more"><a id="' + service + 'details' + i + '" class="show-details">' +
                    '<span class="show-d"><i class="icon-chevron-up icon-chevron-down"></i></span></a></td>' +
                  '<td class="ad-sev-td">' + sev2label(ad.severity) + '</td>' +
                  '<td class="ad-stat-td"><span class="label">' + ad.status + '</span></td>' +
                  '<td>'+ date2str(ad.lastReceiveTime) + '</td>' +
                  '<td>' + ad.duplicateCount + '</td>' +
                  '<td>' + ad.resource + '</td>' +
                  '<td>' + ad.event + '</td>' +
                  '<td>' + ad.value + '</td>' +
                  '<td class="alert-text">' + ad.text;
        if (ad.status == 'OPEN') {
          rows +=     '<a id="' + ad.id + '" class="ack-alert" rel="tooltip" title="Acknowledge"><i class="icon-star-empty"></i></a>';
        }
        if (ad.status == 'ACK') {
          rows +=     '<a id="' + ad.id + '" class="unack-alert" rel="tooltip" title="Unacknowledge"><i class="icon-star"></i></a>';
        }
        rows += '<a id="' + ad.id + '" href="mailto:?subject=' + ad.summary + '&body=' + ad.text + '%0D%0A%0D%0ASee http://' + document.domain + '/alerta/details.php?id=' + ad.id + '" class="email-alert" rel="tooltip" title="Email Alert" target="_blank"><i class="icon-envelope"></i></a>';
        rows +=  '<a id="' + ad.id + '" class="tag-alert" rel="tooltip" title="Tag Alert"><i class="icon-tags"></i></a>';
        rows +=  '<a id="' + ad.id + '" class="delete-alert" rel="tooltip" title="Delete Alert"><i class="icon-trash"></i></a>';
        rows +=  '</td>' +
                '</tr>' +
                '<tr id="' + service + 'details' + i +'data" class="initially-hidden">' +
                  '<td colspan="10" class="alert-more"><table class="table table-bordered table-condensed alert-more-table">' +
                     '<tr><td>' + 
                        '<table class="table table-condensed table-striped">' +
                        '<tr><td><b>Alert ID</b></td><td>' + ad.id +
                          ' <a href="/alerta/details.php?id=' + ad.id + '" target="_blank"><i class="icon-share"></i></a></td></tr>' +
                        '<tr><td><b>Last Receive Alert ID</b></td><td>' + ad.lastReceiveId + '</td></tr>' +
                        '<tr><td><b>Create Time</b></td><td>' + date2str(ad.createTime) + '</td></tr>' +
                        '<tr><td><b>Receive Time</b></td><td>' + date2str(ad.receiveTime) + '</td></tr>' +
                        '<tr><td><b>Last Receive Time</b></td><td>' + date2str(ad.lastReceiveTime) + '</td></tr>' +
                        '<tr><td><b>Resource</b></td><td>' + ad.resource + '</td></tr>' +
                        '<tr><td><b>Environment</b></td><td>' + ad.environment + '</td></tr>' +
                        '<tr><td><b>Service</b></td><td>' + ad.service + '</td></tr>' +
                        '<tr><td><b>Event</b></td><td>' + ad.event + '</td></tr>' +
                        '<tr><td><b>Group</b></td><td>' + ad.group + '</td></tr>' +
                        '<tr><td><b>Severity</b></td><td>' + sev2label(ad.previousSeverity) + ' -> ' + sev2label(ad.severity) + '</td></tr>' +
                        '<tr><td><b>Status</b></td><td><span class="label">' + ad.status + '</span></td></tr>' +
                        '<tr><td><b>Value</b></td><td>' + ad.value + '</td></tr>' +
                        '<tr><td><b>Text</b></td><td>' + ad.text + '</td></tr>' +
                        '<tr><td><b>Threshold Info</b></td><td>' + ad.thresholdInfo + '</td></tr>' +
                        '<tr><td><b>Type</b></td><td>' + ad.type + '</td></tr>' +
                        '<tr><td><b>Repeat</b></td><td>' + ad.repeat + '</td></tr>' +
                        '<tr><td><b>Duplicate Count</b></td><td>' + ad.duplicateCount + '</td></tr>' +
                        '<tr><td><b>Summary</b> </td><td>' + ad.summary + '</td></tr>' +
                        '<tr><td><b>Origin</b></td><td>' + ad.origin + '</td></tr>' +
                        '<tr><td><b>Tags</b></td><td>' + tagsdata + '</td></tr>' +
                        '<tr><td><b>Graphs</b></td><td>' + graphsdata + '</td></tr>' +
                        '<tr><td><b>More Info</b></td><td><a href="' + ad.moreInfo + '" target="_blank">' + ad.moreInfo + '</a></td></tr>' +
                        '</table>' +
                      '</td>' +
                    historydata +
                  '</tr></table></td>' +
                '</tr>';

      });

      $('#' + service + '-alerts').html(rows);
      $('#' + service + ' th').removeClass('loader');

    if (refresh) {
      timer = setTimeout(function() { getAlerts(service, filter, refresh); }, 120000);
    }
  }