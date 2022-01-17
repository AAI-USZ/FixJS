function(i, exception) {
      rows += '<tr>';
      rows += '<td>' + exception.env + '<br />';
      rows += (exception.url && exception.url !== "{}" ? stringToUrl(exception.url).pathname : 'n/a') + '</td>';
      rows += '<td>' + exception.count + '</td>';
      rows += '<td>' + (humaneDate(exception.last_occurrence) || exception.last_occurrence) + '</td>';
      rows += '</tr>';
    }