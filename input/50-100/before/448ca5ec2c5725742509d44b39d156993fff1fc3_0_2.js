function(index, item) {
          profHTML += " <button class='close' data-dismiss='alert'>×</button>"
          profHTML += "<h4>" + item.schoolName + "</h4>"; 
          profHTML += "<h4><small>" + getDateStr(item.startDate) + " - "+ getDateStr(item.endDate) + "</small></h4>"; 
          profHTML += "<p>" + item.fieldOfStudy + ", " + item.degree + "</p>"; 
          profHTML += "<p>" + getSummaryStr(item.notes) + "</p>"; 
        }