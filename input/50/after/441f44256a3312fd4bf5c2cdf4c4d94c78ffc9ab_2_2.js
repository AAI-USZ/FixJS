function() {
      $("#box").append($("<div><i>Question timed out</i><div>"));
      $("#box").animate({scrollTop:$("#box")[0].scrollHeight},"0ms");
    }