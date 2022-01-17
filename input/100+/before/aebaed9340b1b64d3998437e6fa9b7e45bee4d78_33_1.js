function()
{
  this.resourcedata = null;
  this.container = null;
  this.drawer = null;
  this.title = null

  const HIGHLIGHTED_LINE_CLASSNAME = 'highlighted-line';
  const RESOURCE_DETAIL_CONTAINER_CLASSNAME = 'resource-detail-container'
  const TEXT = document.TEXT_NODE;
  const ELE  = document.ELEMENT_NODE;
  this._span = document.createElement('span');
  this._span.textContent = ' ';
  this._line_count = 0;
  this._line_found = false;
  this._target_line = 0;
  this._root_ele = null;
  this._tops = [];

  this._traverse_ele = function(ele)
  {
    const CR = "\r";
    const LF = "\n";
    var child = ele.firstChild;
    while (child && !this._line_found)
    {
      if (child.nodeType == ELE)
      {
        this._traverse_ele(child);
      }
      else if (child.nodeType == TEXT)
      {
        var value = child.nodeValue;
        for (var pos = 0, len = value.length; pos < len; pos++)
        {
          var c = value.charAt(pos);
          // Linefeed recognition will not support Acorn BBC spooled text output 
          if ((c == CR ) || (c == LF))
          {
            this._line_count++;
            if (this._line_count == this._target_line)
            {
              var target_pos = child.splitText(pos);
              child.parentNode.insertBefore(this._span, target_pos);
              this._tops.push(this._span.getBoundingClientRect().top);
              child.parentNode.removeChild(this._span);
              child.parentNode.normalize();
              if (this._tops.length < 2)
              {
                this._target_line += 1;
              }
              else
              {
                var scroll_container = ele;
                var container_top = scroll_container.getBoundingClientRect().top;
                var delta = this._tops[1] - this._tops[0];
                var scroll_top = scroll_container.scrollTop;
                ele.addClass(HIGHLIGHTED_LINE_CLASSNAME);
                ele.style.cssText = 
                  "background-size: 100% " + delta + "px;" +
                  "background-position: 0 " + 
                    (this._tops[0] - container_top + scroll_top) + "px;";
                
                var scroll_position = scroll_top + this._tops[0] - container_top;
                if (scroll_position <= this._root_ele.parentNode.clientHeight)
                {
                  scroll_position-=64;
                }
                this._root_ele.scrollTop = scroll_position;
                this._line_found = true;
                return;
              }
            }
            if ((c == CR) && (value.charAt(pos+1) == LF))
            {
              pos++;
            }
          }
        }
      }
      child = child && child.nextSibling;
    }

  }
  this.clear_line_numbers = function(container)
  {
    // reset all properties
    this._line_count = 0;
    this._line_found = false;
    this._target_line = 0;
    this._tops = [];
    var _ele = container.querySelectorAll('.'+HIGHLIGHTED_LINE_CLASSNAME)[0];
    if (_ele)
    {
      _ele.removeClass(HIGHLIGHTED_LINE_CLASSNAME)
    }
  }

  this.go_to_line = function(container, data)
  {

    if (!data || !(data.lines && data.lines[0])) return;
    this._root_ele = container.getElementsByClassName(RESOURCE_DETAIL_CONTAINER_CLASSNAME)[0];
    if (this._root_ele)
    {
      this.clear_line_numbers(this._root_ele)
      this._target_line = parseInt(data.lines[0]);
      this._traverse_ele(this._root_ele);
    }

  }

  // interface:

  /**
   * Override this method in subclasses to to the type specific rendering.
   * The method is called from the main createView function. If it returns
   * something, that is treated as a template and inserted.
   * If it returns something falsy, then the assumption is that the method
   * has inserted the approprate content into the container itself.
   */
  this.render_type_details = function(container, resource, resourcedata) {}



  this.createView = function(container)
  {
    container.clearAndRender(this.drawer.render());
    if (this.resourcedata === null)
    {
      var resptype = cls.ResourceUtil.mime_to_content_mode(this.resource.mime);
      this.service.fetch_resource_data(this.on_resource_data.bind(this),
                                       this.resource.id, resptype);
    }
    else
    {
      var tpl = this.render_type_details(container, this.resource, this.resourcedata);
      if (tpl)
      {
        container.render(tpl);
        cls.ResourceDetailBase.sync_dimensions(container);
        this.go_to_line(container, this.data);
      }
    }

  }

  this.render_type_details = function(container, resource, resourcedata)
  {
    return ["h1", "No resource details"];
  }

  this.on_resource_data = function(type, data)
  {
    const CONTENT = 5, TEXTCONTENT = 3;
    this.resourcedata = data[CONTENT] ? data[CONTENT][TEXTCONTENT] : "";

    this.update();
  }

  this.init = function(res, service)
  {
    this.service = service;
    this.resource = res;
    this.resourcedata = null;
    this.filename = cls.ResourceUtil.url_filename(res.url) || ui_strings.S_RESOURCE_ALL_TABLE_NO_FILENAME;
    this.drawer = new MetadataDrawer(res);
    this.drawer.expanded = false;
    cls.ResourceDetailBase.prototype.init.call(this, this.filename);
  }
}