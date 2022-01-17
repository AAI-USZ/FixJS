function(ele)
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
            if (this._line_count == this._line)
            {
              var target_pos = child.splitText(pos);
              child.parentNode.insertBefore(this._span, target_pos);
              this._tops.push(this._span.getBoundingClientRect().top);
              child.parentNode.removeChild(this._span);
              if (this._tops.length < 2)
              {
                this._line+=2;
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

                child.parentNode.normalize();
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