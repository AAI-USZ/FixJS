function(index, item) {
          //profHTML += " <button class='close' data-dismiss='alert'>×</button>"
          profHTML += "<h4>" + item.company.name + "</h4>"; 
          profHTML += "<h4><small>" + getDateStr(item.startDate) + " - "+ getDateStr(item.endDate, item.isCurrent) + "</small></h4>"; 
          profHTML += "<p>" + getSummaryStr(item.summary) + "</p>"; 
        }