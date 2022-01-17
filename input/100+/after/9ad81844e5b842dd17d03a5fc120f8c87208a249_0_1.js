function uncollapser(type,media,count)
{
  $('#uncollapse_links').hide();
  $('#uncollapse_loading').show();
  media = media ? "&media=true" : "";
  data = $('.post:last')[0].id.split('_');
  id = data[1];

  var start = $('.post:first').next()[0].id.split('_')[3] - 1;
  var num = count;
  if (count !== null)
  {
    start -= count;
  }
  else
  {
    num = start;
    start = 0;
  }

  if (start < 0)
  {
    num += start;
    start = 0;
  }
  $("#uncollapse_counter").html(start);
  $.ajax(
  {
    url: '/'+type+'/view/'+id+'/-'+start+'/'+num+'/&ajax=true'+media,
    cache: false,
    success: function(html)
    {
      $('#uncollapse').after(html);
      if(start<=0) $('#uncollapse').hide();
      $('#uncollapse_loading').hide();
      $('#uncollapse_links').show();
    }
  });
}