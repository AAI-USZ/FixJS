function(id, name, view_list, default_unfolded_list)

{

  this._super_createView = this.createView;

  this.createView = function(container)

  {

    this._super_createView(container);

    var quick_find = this.getToolbarControl(container, 'css-inspector-text-search');

    var search_term = window.element_style.get_search_term();

    if (quick_find && search_term)

    {

      quick_find.value = search_term;

    }

  }

  this.init(id, name, view_list, default_unfolded_list);

}