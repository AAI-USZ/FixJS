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
     {input: 'sis',               sTitle: 'Student Information System'},
     {input: 'othertools',        sTitle: 'Other Tools'},
     {input: 'indylms',           sTitle: 'Independent LMS'},
     {input: 'indygradebook',     sTitle: 'Independent Gradebook Grades'},
     {input: 'indyassessment',    sTitle: 'Independent Assessment'},
     {input: 'lmssislink',        sTitle: 'LMS and SIS Link'},
     {input: 'alltools',          sTitle: 'Tools', bFilterable: true, bSplitOnComma:true}
     ];

  // DataTable depends on ordered columns, but we want to have the flexibility to refer
  // to particular columns without worrying about their position, so we generate a reverse map
  // from column name to its index
  for (var i = 0; i < aoColumns.length; ++i) {
    colNumLookup[aoColumns[i].input] = i;
  }

  for (var i = 0; i < table_data.length; ++i) {
    var model = table_data[i];
    
    var data_row = aoColumns.map(function(col) {
        var t = model[col.input] ? model[col.input] : '';
        t = t.replace(/K12, Inc/, "K12 Inc"); // normalize weird input
        return t;
      });

    // aggregate all the tools fields into their own uber-list
    // ideally, this would be already done in the JSON file (probably via map/reduce)
    // but I don't have that working yet, so we do some custom stuff here
    var alltools = [];
    for (var field in {'content':1, 'sis':1, 'othertools':1, 'indylms':1, 'indygradebook':1, 'indyassessment':1, 'lmssislink':1}) {
      alltools.push(data_row[colNumLookup[field]].split(/ *, */));
    }
    data_row[colNumLookup['alltools']] = alltools.join(', ');

    data.push(data_row);
  }

  return {
    aoColumns: aoColumns,
    aaData: data
  };
}