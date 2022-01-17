function(e){

      if (e.keyCode == 37) {
         $("#previous-button").click();
         return false;
      }

      if (e.keyCode == 38) {
         $("#card-partial").click();
         return false;
      }

      if (e.keyCode == 39) {
         $("#next-button").click();
         return false;
      }

}