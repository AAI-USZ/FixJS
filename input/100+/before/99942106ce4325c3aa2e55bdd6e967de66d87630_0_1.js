function load_courses(){

  var template;

  var $container = $('#container');

  var $newItems = $('');

  var $oldItems = $('.box');

  var $last_opened = $('');



  if($('#final_message').is(':visible')){

    $('#final_message').hide();

  }



  if($('#second_message').is(':visible')){

    $('#second_message').hide();

    $('#final_message').show();

  }



  if($('#welcome_message').is(':visible')){

    $('#welcome_message').hide();

    $('#second_message').show();

  }



  $container.isotope('remove', $oldItems);



  var opts = {

  lines: 13, // The number of lines to draw

  length: 17, // The length of each line

  width: 6, // The line thickness

  radius: 18, // The radius of the inner circle

  rotate: 0, // The rotation offset

  color: '#ffffff', // #rgb or #rrggbb

  speed: 2.2, // Rounds per second

  trail: 60, // Afterglow percentage

  shadow: false, // Whether to render a shadow

  hwaccel: true, // Whether to use hardware acceleration

  className: 'spinner', // The CSS class to assign to the spinner

  zIndex: 2e9, // The z-index (defaults to 2000000000)

  top: 'auto', // Top position relative to parent in px

  left: 'auto' // Left position relative to parent in px

  };



  var spinner = new Spinner(opts).spin(document.body);



  $.get('templates.html', function(templates) {

    course_template = $(templates).filter('#course_template').html();

  });



  var row_number = Math.floor(($container.width() - 15)/183);

  var number = row_number * 4 - 3;



  $.getJSON('/courses?n=' + number, function(data) {

    $.each(data, function(index, course_obj) {

      var course = course_obj["course"];

      var course_data = {

        oci_id: course["oci_id"],

        number: course["department"] + " " + course["number"],

        name: course["name"],

        professors: course["professors"].split(",").join(", ").truncate(50, true),

        desc: course["desc"],

        skills: course["skills"].split(",").join(" ") + " " + course["areas"].split(",").join(" "),

        hours: course["hours"].split(",").join(", "),

        color1: course["colors"][0],

        color2: course["colors"][1],

        no_exam: course["no_exam"] ? 'no_exam' : '',

        reading_period: course["reading_period"] ? 'reading_period' : '',

        permission_required: course["permission_required"] ? "permission_required" : ''

      }



      var output = Mustache.render(course_template, course_data);

      if (index == 0){

        output = $(output).addClass("large");

      }

      $newItems = $newItems.add(output);

    })



    spinner.stop();



    $container.isotope( 'insert', $newItems );

    $last_opened = $('.large');



    $container.find('.box').hover(

      function(){

        $(this).css("background-color", $(this).data('color-secondary'));

      },

      function(){

        $(this).css("background-color", $(this).data('color-primary'));

      }

    );



    $(".no_exam, .reading_period, .permission_required").tipTip({delay: 200});



    $('a.oci').click(function(){

      window.open("http://students.yale.edu/oci/resultDetail.jsp?course=" + $(this).data("oci-id") + "&term=201203", "_blank", 'width=600,height=400,top=50,left=50');

      return false;

    })

  });



  $container.delegate( '.box', 'click', function(){

    $last_opened.removeClass('large');

    $(this).addClass('large');

    $container.isotope('reLayout');

    $last_opened = $(this);

  });

}