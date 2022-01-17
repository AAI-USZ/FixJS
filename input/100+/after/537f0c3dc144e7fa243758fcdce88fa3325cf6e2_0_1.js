function demultiplex_files () {
  var files = [];
  var filebox = document.getElementById('inbox_select');
  for (var i=0; i<filebox.options.length; i++) {
    if (filebox.options[i].selected) {
      files[files.length] = filebox.options[i].value;
    }
  }
  
  if (files.length == 2) {
    var seqfile;
    if (files[0].match(is_a_sequence_file_ending) || files[1].match(is_a_sequence_file_ending)) {
      alert("This might take some minutes, depending on filesize.\nWhen the demultiplexing has finished, your inbox\nwill update automatically.\n\n");
      
      update_inbox(null, files, "demultiplex");
    } else {
      alert("Your selection must include a sequence file (.fasta, .fa, .ffn, .frn, .fna, .fq, or .fastq)");
      return false;
    }
  } else {
    alert("You need to select a sequence file and a barcode file to proceed with demultiplexing.");
  }
}