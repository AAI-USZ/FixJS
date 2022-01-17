function submit_job () {
  var seq_files = selected_sequence_files.join('|');
  $.get("?page=Upload&action=check_for_duplicates&seqfiles="+seq_files, function (data) {
      if (data == "unique") {
	  document.forms.submission_form.submit();
      } else {
	  if ( confirm(data) ) {
	      document.forms.submission_form.submit();
	  } else {
	      return false;
	  }
      }
  });
}