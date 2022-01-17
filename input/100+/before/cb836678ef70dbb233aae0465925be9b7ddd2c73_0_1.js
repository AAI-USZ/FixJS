function(shortid, id, type) {
    if (!type) {
      var type = 'VuFind';
    };
    if (type != 'VuFind'){
      var loadDescription = path + "/EcontentRecord/" + id + "/AJAX/?method=getDescription";
    }
    else {
      var loadDescription = path + "/Record/" + id + "/AJAX/?method=getDescription";
    }
  
    var rawData = $.ajax(loadDescription,{
      async: false
    }).responseText;
    var xmlDoc = $.parseXML(rawData);
    var data = $(xmlDoc);
  
    return {
      id: id,
      description: data.find('description').text(),
      length: data.find('length').text(),
      publisher: data.find('publisher').text(),
    };
  }