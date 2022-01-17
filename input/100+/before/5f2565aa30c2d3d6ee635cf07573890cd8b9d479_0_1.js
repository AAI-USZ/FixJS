function(data){
          console.log(data[0].content);
          $('#midText').append(data[0].content);
          $('#midText').fadeIn();
          }