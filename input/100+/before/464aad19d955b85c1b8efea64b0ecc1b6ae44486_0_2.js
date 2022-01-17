function addRow(tableID,prefixSelect,prefixDiv) { 
	var table = document.getElementById(tableID);
	var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.setAttribute("class","spaceUnder");
    var cell1 = row.insertCell(0);  
    var oImg = document.createElement("img");
    oImg.setAttribute("src", "/html/images/icons/cross.png");
    oImg.setAttribute("alt", "delete");
    oImg.setAttribute("title", "delete row");
    oImg.style.cursor="pointer";
    oImg.onclick = function(){deleteRow(tableID,prefixSelect+(rowCount),prefixDiv+(rowCount));};
    cell1.appendChild(oImg);

    var cell2 = row.insertCell(1);
    var select = document.createElement("select");    
    select.setAttribute("name", prefixSelect+(rowCount));
    select.setAttribute("id", prefixSelect+(rowCount));
    select.setAttribute("dojoType", "dijit.form.FilteringSelect"); 
    createOption(select, "1", "1 Column (100)",true);
    createOption(select, "yui-gc-template", "2 Column (66/33)",false);
    createOption(select, "yui-gd-template", "2 Column (33/66)",false);
    createOption(select, "yui-ge-template", "2 Column (75/25)",false);
    createOption(select, "yui-gf-template", "2 Column (25/75)",false);            
    createOption(select, "yui-gb-template", "3 Column (33/33/33)",false);
    select.onchange=function(){addGrid(select.value, select.getAttribute("name"));};
    cell2.appendChild(select);
    dojo.parser.parse(cell2);
    dojo.connect(dijit.byId(prefixSelect+(rowCount)), "onChange", this, function(e){addGrid(e, prefixDiv+(rowCount), rowCount);}); 
    addGrid(1,prefixDiv+(rowCount),rowCount);
}