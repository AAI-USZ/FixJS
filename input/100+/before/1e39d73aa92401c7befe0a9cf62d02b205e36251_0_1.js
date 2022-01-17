function(se) {
        var msg = [];
        se = JSON.parse(se);
        console.log(se);
        for(var i = 0; i < se.length; i++){
            if(typeof(se[i]) === 'string') {
                msg.push(se[i]);
            }
            else if(se[i].type === "ColoredPart"){
                //console.log("bad locs: ", fixLoc(se[i].loc));
                msg.push(new types.ColoredPart(se[i].text, fixLoc(se[i].loc)));
            }

            else if(se[i].type === "MultiPart"){
                console.log("bad locs list: ", se[i].locs);
                msg.push(new types.MultiPart(se[i].text, fixLocList(se[i].locs)));

            }
            else msg.push(se[i]+'');

        }
        return new types.Message(msg);
    }