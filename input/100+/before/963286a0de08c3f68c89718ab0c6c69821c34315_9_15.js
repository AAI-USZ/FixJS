function lists_toggle_filter(subject,id) {
    alreadySelected = $('#row_'+subject+id).hasClass('fhighlighted');
    $('#row_'+subject+id).removeClass('fhighlighted');
    if (alreadySelected) {
        switch (subject) {
        case 'usr':
          filterUsr.splice(filterUsr.indexOf(id),1);
        break;
        case 'knd':
          filterKnd.splice(filterKnd.indexOf(id),1);
          lists_knd_prefilter(0,'filter');
        break;
        case 'pct':
          filterPct.splice(filterPct.indexOf(id),1);
        break;
        case 'evt':
          filterEvt.splice(filterEvt.indexOf(id),1);
        break;
      }
    }
    else
    {
      $('#row_'+subject+id).addClass('fhighlighted');
      switch (subject) {
        case 'usr':
          filterUsr.push(id);
        break;
        case 'knd':
          filterKnd.push(id);
          lists_knd_prefilter(id,'filter');
        break;
        case 'pct':
          filterPct.push(id);
        break;
        case 'evt':
          filterEvt.push(id);
        break;
      }
    }
}