function unselect_sequence_file () {
  document.getElementById('filter_ln').disabled = false;
  document.getElementById('deviation').disabled = false;
  document.getElementById('filter_ambig').disabled = false;
  document.getElementById('max_ambig').disabled = false;
  document.getElementById('dynamic_trim').disabled = false;
  document.getElementById('min_qual').disabled = false;
  document.getElementById('max_lqb').disabled = false;
  
  selected_sequence_file = "";
  document.getElementById("selected_sequences").innerHTML = "";
  document.getElementById("available_sequences").style.display = '';
  document.getElementById("sel_seq_pill").className = "pill_incomplete";
  document.getElementById("icon_step_3").style.display = "none";
  update_inbox();
  check_submitable();
}