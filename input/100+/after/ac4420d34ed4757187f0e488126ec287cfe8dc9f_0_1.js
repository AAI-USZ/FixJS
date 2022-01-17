function() {
    $("#slider").slider({
        min: 0,
        max: 210,
        values: [10, 200],
        range: true,
        stop: function(event, ui) {
            $("#minD").val(ui.values[0]);
            $("#maxD").val(ui.values[1]);
        },
        slide: function(event, ui){
            $("#minD").val(ui.values[0]);
            $("#maxD").val(ui.values[1]);
        }
    });

    $("input#minD").change(function(){
        var value1=$("input#minD").val();
        var value2=$("input#maxD").val();

        if(parseInt(value1) > parseInt(value2)){
            value1 = value2;
            $("input#minD").val(value1);
        }
        $("#slider").slider("values",0,value1);
    });

    $("input#maxD").change(function(){
        var value1=$("input#minD").val();
        var value2=$("input#maxD").val();

        if (value2 > 1000) { value2 = 1000; $("input#maxD").val(1000)}

        if(parseInt(value1) > parseInt(value2)){
            value2 = value1;
            $("input#maxD").val(value2);
        }
        $("#slider").slider("values",1,value2);
    });
}