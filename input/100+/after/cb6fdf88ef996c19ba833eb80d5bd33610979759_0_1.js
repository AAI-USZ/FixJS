function() {
  $('.pagination a').pjax('#branches',{timeout:2000});
  $('#branches').bind('pjax:start', function(){ $('.loader').show(); })
  .bind('pjax:end', function(){ $('.loader').hide(); });
}