function (containerSel,columnCl,json,radGroupName)
    {        
        jsonData = json;
        containerSelector = containerSel;
        columnClass = columnCl;
        updateColumns();
        radSelector = 'input[name='+ radGroupName + ']:radio';
        $(radSelector).click(radClick);   
    }