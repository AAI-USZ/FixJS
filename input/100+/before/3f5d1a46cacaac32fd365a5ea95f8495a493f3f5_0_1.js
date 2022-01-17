function() {
    // Site Code...
    var parseProjectForm = function(data) {
    // Uses form data here...
    console.log(data);
    };
    $(document).bind('pageinit', function(){
        var projectForm = $("#projectForm"),
            rcerrorslink = $("#rcerrorslink");
        projectForm.validate(
        {
        //options to change behavior of validator
            invalidHandler: function(form, validator){
                //error messages
                rcerrorslink.bind();
                var html = " ";
                for(var key in validator.submitted){
                    var label = $('label[for^="'+ key +'"]').not('[generated]');
                    var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                    var fieldName = legend.length ? legend.text() : label.text();
                    html += "<li>" + fieldName + "</li>";
                };
                $("#recordCollegeErrors ul").html(html);
            },
            submitHandler: function()
            {
                //when valid form is submitted
                //store all data
                //target form
                var data = projectForm.serializeArray();
                //call function & pass data in
                parseProjectForm(data);
            }
        });
    });
    // Style field highlight     
    $('input').focus(function(){
        $(this).addClass('curFocus');
    });

    $('input').blur(function(){
        $(this).removeClass('curFocus');
    });

    // variable defaults
   

    //getElementById function
    function ne (x) {
        var theElement = $(x);
        return theElement;
};

    // Create select field element and populate with options.
    var gpaRanges = ["--Choose Your GPA--","A: 4.0 - 3.5", "B: 3.4 - 2.5", "C: 2.4 - 1.5", "D: 1.4 - 1.0", "F: 0.9 - 0.0"];       
    /*function(id, gpaRanges)
    {
        $('#gpa').append('<select id="'+id+'"></select>');
        $.each(gpaRanges, function(val, text) {
                $('#gpa'+id).append(
                $('<option></option').val(val).html(text)
        );})
    }
*/

    //obj is the list of option values
    function obj (){
        var create = '<select id="test">';
        for(var i = 0; i < gpaRanges.length;i++)
        {
            create += '<option value="'+gpaRanges[i]+'">'+gpaRanges[i]+'</option>';
        }
        create += '</select>';
        $('#select').append(create);
};
    obj();
}