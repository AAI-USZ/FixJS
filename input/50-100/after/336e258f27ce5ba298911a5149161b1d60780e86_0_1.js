function unselect_metadata_file () {
  unselect_sequence_file()
  selected_metadata_file = "";
  selected_libraries = [];
  document.getElementById("sel_md_pill").className = "pill_incomplete";
  document.getElementById("icon_step_1").style.display = "none";
  document.getElementById("sel_project_pill").className = "pill_incomplete";
  document.getElementById("icon_step_2").style.display = "none";
  update_inbox();
  check_submitable();
}