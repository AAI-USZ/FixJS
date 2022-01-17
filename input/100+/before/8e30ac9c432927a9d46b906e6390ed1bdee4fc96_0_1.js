function fnGetColumnsAndData() {
  var data = [];

  aoColumns =
    [{input: 'title',             sTitle: 'School', bFilterable: true, bSplitOnComma: false, sWidth: '250px'},
     {input: 'detail',            sTitle: 'Detail'},
     {input: 'url',               sTitle: 'URL'},
     {input: 'hqstate',           sTitle: 'State', bFilterable: true, sWidth: '100px'},
     {input: 'type',              sTitle: 'Type', bFilterable: true, bSplitOnComma: true},
     {input: 'focus',             sTitle: 'Focus', bFilterable: true, bSplitOnComma: true},
     {input: 'blendedsubjects',   sTitle: 'Blended subjects', bFilterable: true, bSplitOnComma: true},
     {input: 'programmodels',     sTitle: 'Blended-learning model', bFilterable: true, bSplitOnComma: true},
     {input: 'postdate',          sTitle: 'Date Posted', 'sType': 'date'},
     {input: 'hqcity',            sTitle: 'City'},
     {input: 'gradesserved',      sTitle: 'Grades Served', bFilterable: true},
     {input: 'frl',               sTitle: '% Free or Reduced Lunch', 'sType': 'formatted-num'},
     {input: 'minority',          sTitle: '% Black/ or Hispanic', 'sType': 'formatted-num'},
     {input: 'revenueperpupil',   sTitle: 'Revenue per Pupil', 'sType': 'formatted-num'},
     {input: 'blendedgrades',     sTitle: 'Blended Grades'},
     {input: 'blendedenrollment', sTitle: 'Blended Enrollment', 'sType': 'formatted-num'},
     {input: 'content',           sTitle: 'Content',bFilterable: true, bSplitOnComma: true},
     {input: 'sis',               sTitle: 'Student Information System', bFilterable: true, bSplitOnComma: true},
     {input: 'othertools',        sTitle: 'Other Tools', bFilterable: true, bSplitOnComma: true},
     {input: 'indylms',           sTitle: 'Independent LMS', bFilterable: true, bSplitOnComma: true},
     {input: 'indygradebook',     sTitle: 'Independent Gradebook Grades', bFilterable: true, bSplitOnComma: true},
     {input: 'indyassessment',    sTitle: 'Independent Assessment', bFilterable: true, bSplitOnComma: true},
     {input: 'lmssislink',        sTitle: 'LMS and SIS Link', 'sType': 'formatted-num', bFilterable: true, bSplitOnComma: true}
     ];

  // DataTable depends on ordered columns, but we want to have the flexibility to refer
  // to particular columns without worrying about their position, so we generate a reverse map
  // from column name to its index
  for (var i = 0; i < aoColumns.length; ++i) {
    colNumLookup[aoColumns[i].input] = i;
  }

  for (var i = 0; i < table_data.length; ++i) {
    var model = table_data[i];
    data.push(aoColumns.map(function(col) { 
        return model[col.input] ? model[col.input] : ''; 
    }));
  }

  return {
    aoColumns: aoColumns,
    aaData: data
  };
}