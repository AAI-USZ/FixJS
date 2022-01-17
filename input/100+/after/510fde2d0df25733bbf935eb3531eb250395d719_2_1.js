function() {

    console.log('Init profile data.');

    var ok = false;

  

 

    //Get the user data if available      

    $.ajax({

      type: "GET",

      url: profileServerUrl,

      async: false,

      success: function(data) {

        data = JSON.parse(data);



        if(!data.error) {

          profile = data;

          setProfileForm();

          ok = true;

        } else {

          console.log(data.error);

        }

      },

      error: function() {},

      dataType: "text",

      contentType : "application/json; charset=utf-8"

    });

    

    return ok;

  }