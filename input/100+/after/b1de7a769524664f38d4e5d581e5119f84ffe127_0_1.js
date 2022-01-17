function fetch_data_options() {
  var data = [];

  aoColumns =
    [{input: 'title',             sTitle: 'Model', sWidth: '250px'},
     {input: 'detail',            sTitle: 'Detail'},
     {input: 'url',               sTitle: 'URL'},
     {input: 'hqstate',           sTitle: 'State', bFilterable: true, sWidth: '100px'},
     {input: 'type',              sTitle: 'Type', bFilterable: true},
     {input: 'focus',             sTitle: 'Focus', bFilterable: true},
     {input: 'blendedsubjects',   sTitle: 'Blended subjects', bFilterable: true},
     {input: 'programmodels',     sTitle: 'Blended-learning model', bFilterable: true},
     {input: 'postdate',          sTitle: 'Date Posted', 'sType': 'date'},
     {input: 'hqcity',            sTitle: 'City'},
     {input: 'gradesserved',      sTitle: 'Grades Served'},
     {input: 'frl',               sTitle: '% Free or Reduced Lunch', 'sType': 'formatted-num'},
     {input: 'minority',          sTitle: '% Black/ or Hispanic', 'sType': 'formatted-num'},
     {input: 'revenueperpupil',   sTitle: 'Revenue per Pupil', 'sType': 'formatted-num'},
     {input: 'blendedgrades',     sTitle: 'Blended Grades'},
     {input: 'blendedenrollment', sTitle: 'Blended Enrollment', 'sType': 'formatted-num'},
     {input: 'content',           sTitle: 'Content',bFilterable: true},
     {input: 'sis',               sTitle: 'Student Information System', bFilterable: true},
     {input: 'othertools',        sTitle: 'Other Tools', bFilterable: true},
     {input: 'indylms',           sTitle: 'Independent LMS', bFilterable: true},
     {input: 'indygradebook',     sTitle: 'Independent Gradebook Grades', bFilterable: true},
     {input: 'indyassessment',    sTitle: 'Independent Assessment', bFilterable: true},
     {input: 'lmssislink',        sTitle: 'LMS and SIS Link', 'sType': 'formatted-num', bFilterable: true}
     ];

  // generate a reverse map from name to index
  for (var i = 0; i < aoColumns.length; ++i) {
    colNumLookup[aoColumns[i].input] = i;
  }

  for (var i = 0; i < table_data.length; ++i) {
    var model = table_data[i];

    // go through the column definitions and put the respective columns into their right place
    data.push(aoColumns.map(function(col) { 
          return model[col.input] ? model[col.input] : ''; 
    }));
  }

  return {aoColumns: aoColumns, aaData: data};
}