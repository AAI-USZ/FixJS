function(arr){
        // this is to handle blank rows
        var indx = 0;
        $(".multirow-input-tbl tr").each(function(i,item){
            var rank = $(item).find("td [name='PublicationAuthor.Rank']").val();
            var fname = $(item).find("td [name='PublicationAuthor.FirstName']").val();
            var mi = $(item).find("td [name='PublicationAuthor.MiddleInitial']").val();
            var lname = $(item).find("td [name='PublicationAuthor.LastName']").val();
            var title = $(item).find("td [name='PublicationAuthor.Title']").val();
            var org = $(item).find("td [name='PublicationAuthor.Organization']").val();
            var entityId = $(item).find("td [name='PublicationAuthor.EntityId']").val()?$(item).find("td [name='PublicationAuthor.EntityId']").val():0;
            if(lname){
                var objName = "PublicationAuthorDtos["+ indx +"]";
                indx++;
                arr.push({"name":objName+".Rank","value":rank});
                arr.push({"name":objName+".FirstName","value":fname});
                arr.push({"name":objName+".MiddleInitial","value":mi});
                arr.push({"name":objName+".LastName","value":lname});
                arr.push({"name":objName+".Title","value":title});
                arr.push({"name":objName+".Organization","value":org});
                arr.push({"name":objName+".EntityId","value":entityId});
            }
        });
    }