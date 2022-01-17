function(text) {
      var rows = text.split("\n");
      for(l in rows){
        rows[l] = this.parseLineCSV(rows[l]);
      }
      var tableResult = document.createElement("table");
      tableResult.setAttribute("style","table table-striped table-bordered table-condensed");
      
      var tablehead = document.createElement("thead");
      var headerRow = document.createElement("tr");
      for(var i = 0; i < rows[0].length; i++){
        var tableCell = document.createElement("th");
        var input = document.createElement("input");
        tableCell.appendChild(input);
        headerRow.appendChild(tableCell);
      }
      tablehead.appendChild(headerRow);
      tableResult.appendChild(tablehead);
      
      var tablebody = document.createElement("tbody");
      tableResult.appendChild(tablebody);
      for(l in rows){
        var tableRow = document.createElement("tr");
        for(c in rows[l]){
          var tableCell = document.createElement("td");
          tableCell.innerHTML = rows[l][c];
          tableRow.appendChild(tableCell);
        }
        tablebody.appendChild(tableRow);
      }
      if($("#csv-table-area") != []){
        document.getElementById("csv-table-area").appendChild(tableResult);
        this.set("asCSV", JSON.stringify(rows));
      }
    }