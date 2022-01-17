function parseOldList(bugs) {
  var color = d3.scale.category20();

  var oldBugTable = document.getElementById("oldBugTable");
  var thead = oldBugTable.getElementsByTagName("thead")[0];
  var tbody = oldBugTable.getElementsByTagName("tbody")[0];

  var total = 0;

  bugs = bugs.sort(function(a,b) { return a.id > b.id; });
  
  var headers = ["id", "assigned_to", "summary"];
  for(i in headers) {
    var header = document.createElement("th");
    header.innerHTML = headers[i];
    thead.appendChild(header);
  }
  for(i in bugs) {
    var bugRow = document.createElement("tr");
    for(j in headers) {
      var bugCell = document.createElement("td");
      bugCell.textContent = bugs[i][headers[j]];
      if(headers[j] == "summary") {
        bugCell.setAttribute("title", bugs[i][headers[j]]);
      }
      if(headers[j] == "assigned_to") {
        bugCell.textContent = bugs[i][headers[j]].name ? bugs[i][headers[j]].name : "";
      }
      bugCell.setAttribute("style", "background: " + color(i) + ";");
      bugRow.appendChild(bugCell);
    }
    bugRow.addEventListener("click", function(evt) {
      var tgt = evt.target;
      while(tgt.tagName != "TR") {
        tgt = tgt.parentNode;
      }
      tgt = tgt.firstChild.textContent;
      window.open("https://bugzilla.mozilla.org/show_bug.cgi?id=" + tgt);
    }, false);
    
    tbody.appendChild(bugRow);
    total = total + 1;
  }
  document.getElementById("oldTotalCount").firstElementChild.textContent = total;
  document.getElementById("oldBugs").removeAttribute("notloaded");
}