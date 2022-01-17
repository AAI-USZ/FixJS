function(container, data)
  {

    if (!data || !(data.lines && data.lines[0])) return;
    this._root_ele = container.getElementsByClassName(RESOURCE_DETAIL_CONTAINER_CLASSNAME)[0];
    if (this._root_ele)
    {
      this.clear_line_numbers(this._root_ele)
      this._line = parseInt(data.lines[0]);
      this._traverse_ele(this._root_ele);
    }

  }