function(i, exception) {
      rows += '<tr>';
      rows += '<td class="errbit-description-td"><button class="btn btn-mini pull-right errbit-description-toggle">&hellip;</button><div class="errbit-url">' + (exception.url && exception.url !== "{}" ? exception.url : 'n/a') + '</div><br class="clear" /><div class="errbit-description"><pre>' + exception.error_class + '\n' + JSON.stringify(exception.messages) + '</pre></div></td>';
      rows += '<td>' + exception.env + '</td>';
      rows += '<td>' + exception.count + '</td>';
      rows += '<td>' + (humaneDate(exception.last_occurrence) || exception.last_occurrence) + '</td>';
      rows += '</tr>';
    }