function checkFillBlanksStatement(divID){
    var unsortedKeyList = _.map(finishedEqualitiesList, function(key){ return _.clone(key); });
    var finishedKeys = sortEqualityList(unsortedKeyList.reverse(), finishedEqualities);

    var components = divID.split("-");
    var input1 = $($("#"+divID+" input")[0]).val();
    var input2 = $($("#"+divID+" input")[1]).val();
    
    //triangles
    if(components[0] === "t"){
        var triangle1 = finishedKeys[components[1]][0];
        var triangle2 = finishedKeys[components[1]][1];

        if(input1.length != 3 || input2.length != 3){
            return;
        }

        var inputTriangle1 = new Triang([new Seg(input1[0], input1[1]), new Seg(input1[1], input1[2]), new Seg(input1[2], input1[0])],
            [new Ang(input1[0], input1[1], input1[2]), new Ang(input1[1], input1[2], input1[0]), new Ang(input1[2], input1[0], input1[1])]);
        var inputTriangle2 = new Triang([new Seg(input2[0], input2[1]), new Seg(input2[1], input2[2]), new Seg(input2[2], input2[0])],
            [new Ang(input2[0], input2[1], input2[2]), new Ang(input2[1], input2[2], input2[0]), new Ang(input2[2], input2[0], input2[1])]);

        if((inputTriangle1.equals(triangle1) && inputTriangle2.equals(triangle2)) 
            || (inputTriangle1.equals(triangle2) && inputTriangle2.equals(triangle1))){
            $("#"+divID+" input").remove();
            $("#"+divID+" code").remove();
            $("#"+divID+" span").remove();
            var reason = $("#"+divID).html();
            $("#"+divID).html(prettifyEquality([inputTriangle1, inputTriangle2]) + reason);
            $.tmpl.type.code()($("#"+divID+" code")[0]);
            return true;
        }
    }
    //angles
    else if(components[0] === "a"){

    }
    //segments
    else{
        var seg1 = finishedKeys[components[1]][0];
        var seg2 = finishedKeys[components[1]][1];

        if(input1.length != 2 || input2.length != 2){
            return;
        }

        var inputSeg1 = new Seg(input1[0], input1[1]);
        var inputSeg2 = new Seg(input2[0], input2[1]);

        if((inputSeg1.equals(seg1) && inputSeg2.equals(seg2)) || (inputSeg1.equals(seg2) && inputSeg2.equals(seg1))){
            $("#"+divID+" input").remove();
            $("#"+divID+" code").remove();
            $("#"+divID+" span").remove();
            var reason = $("#"+divID).html();
            $("#"+divID).html(prettifyEquality([inputSeg1, inputSeg2]) + reason);
            $.tmpl.type.code()($("#"+divID+" code")[0]);
            return true;
        }
    }
    return false;
}