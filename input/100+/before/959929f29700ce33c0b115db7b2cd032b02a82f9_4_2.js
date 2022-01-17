function(arr){
        // this is to handle blank rows
        var indx = 0;
        $(".multirow-input-tbl tr").each(function(i,item){
            var name = $(item).find("td [name='MembershipPosition.Name']").val();
            var heldFrom = $(item).find("td [name='MembershipPosition.HeldFrom']").val();
            var heldTo = $(item).find("td [name='MembershipPosition.HeldTo']").val();
            var entityId = $(item).find("td [name='MembershipPosition.EntityID']").val()?$(item).find("td[name='MembershipPosition.EntityID']").val():0;
            if(name){
                var objName = "MembershipDtos["+ indx +"]";
                indx++;
                arr.push({"name":objName+".Name","value":name});
                arr.push({"name":objName+".HeldFrom","value":heldFrom});
                arr.push({"name":objName+".HeldTo","value":heldTo});
                arr.push({"name":objName+".EntityId","value":entityId});
            }
        });
    }