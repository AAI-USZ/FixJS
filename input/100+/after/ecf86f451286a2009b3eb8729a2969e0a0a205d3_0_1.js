function(event) {
    event.preventDefault();

    var object = this.object;
    var store = this.store;
    var element = object.toElement();
    var data = object.serialize();

    // Always reset output_files/outgoing_services/chapters
    data.reset_data = true;

    store.eachView(function(view, type) {
      if (view.getData) Object.append(data, view.getData(store, element));
    });

    // Use Title from productions
    if (data.title && data.title !== '') data['metadata.title'] = data.title;
    delete data.title;

    View.getMain().showIndicator();

    API.call(this.getSaveURL(), 'post', JSON.stringify(Object.expand(data))).on({
      success: this.bound('onSave')
    });
  }