function get($element, constructor, dataField){
    var data = $element.data(dataField);
    if (!data) {
      data = new constructor($element);
      $element.data(dataField, data);
    }
    return data;
  }