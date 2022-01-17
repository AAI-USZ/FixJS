function unselect_metadata_file () {
  selected_metadata_file = "";
  selected_libraries = [];
  document.getElementById("sel_md_pill").className = "pill_incomplete";
  document.getElementById("icon_step_1").style.display = "none";
  update_inbox();
  check_submittable();
}