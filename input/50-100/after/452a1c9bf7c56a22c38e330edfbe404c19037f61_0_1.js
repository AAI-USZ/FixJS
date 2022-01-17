function updateGridOpacity() {
  if ($("#toggle-grid").is(':checked')) {
    $("body").addClass("perm-grid");
    localStorage.setItem("perm-grid", "yes");
    $(".tile").css({opacity: 0});
  } else {
    $("body").removeClass("perm-grid");
    localStorage.setItem("perm-grid", "no");
    $(".tile").css({opacity: 0});
  }
}