function (e) {
      if (e.target.id == "pyrt-newpass" || e.target.id == "pyrt-newpassconf") {
         //if ($("#pyrt-newpass").attr("value") == "" || $("#pyrt-newpassconf").attr("value") == "") {
         //   $("#pyrt-newpassconf,#pyrt-newpass").removeClass("badinput goodinput");
         //   return;
         //}
         //if ($("#pyrt-newpass").attr("value") == $("#pyrt-newpassconf").attr("value")) {
         //   $("#pyrt-newpassconf,#pyrt-newpass").removeClass("badinput").addClass("goodinput");
         //} else {
         //   $("#pyrt-newpassconf").addClass("badinput").removeClass("goodinput");
         //}
      } else if (e.target.id == "pyrt-oldpass") {
      } else if (e.target.value == "") {
         $(e.target).removeClass("badinput goodinput warninginput");
         $("#" + e.target.id + "error").html("");
      } else {
         verify(e.target.id, e.target.value);
      }
   }