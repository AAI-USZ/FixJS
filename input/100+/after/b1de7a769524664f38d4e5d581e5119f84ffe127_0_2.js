function fnCreatedRow( nRow, aData, iDataIndex ) {
  // private helper function to avoid hard-coding column indices
  function v(field) {
    return aData[colNumLookup[field]];
  }

  var html = [];

  // title
  html.push('<div class="model_row">');
  
  // location
  html.push('<span class="location">' + v('hqcity') + ', ' + v('hqstate') + '</span>');

  html.push('<h2>' +
            '<a href="' + v('url') + '">' + v('title') + '</a>' +
            '</h2>');

  html.push('<span class="model">' + v('programmodels') + '</span>');

  html.push('<span class="grades"> Grades ' + v('blendedgrades') + '</span>');

  //  html.push('<p>' + v('modeldescription') + '</p>');
  html.push('<p> The face-to-face teacher never lectures. Students choose from a menu of online and other options for learning. Many students use online programs for certain subjects, with a face-to-face teacher providing as-needed help. </p>');

  html.push('</div>');
    
  // set it just to the first td in the row
  $('td:eq(0)', nRow).empty().html(html.join(''));

}