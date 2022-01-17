function()
  {
    if (__buffer && !__has_hit_max_line_chars)
    {
      __char_count += __buffer.length;
      // To handle the width limit (instaed of overflow hidden). 
      // Opera 12 will no longer have that limit, so this is just temporary. 
      if (__char_count > __max_line_chars)
      {
        __buffer = __buffer.slice(0, __buffer.length - (__char_count - __max_line_chars));
        __has_hit_max_line_chars = true;
      }
      switch (__type)
      {
        case STRING:
        {
          __line += "<span class='string'>" +  __buffer + "</span>";
          break;
        }
        case IDENTIFIER:
        {
          if(__js_types.hasOwnProperty(__buffer))
          {
            __line += "<span class='" + __js_types[__buffer] + "'>" + 
                      __buffer + "</span>";
          }
          else if(__buffer in js_keywords)
          {
            __line += "<span class='js_keywords'>" +  __buffer + "</span>";
          }
          else if(__buffer in js_builtins)
          {
            __line += "<span class='js_builtins'>" +  __buffer + "</span>";
          }
          else
          {
            __line += __buffer;
          }
          break;
        }
        case NUMBER:
        {
          __line += "<span class='number'>" +  __buffer + "</span>";
          break;
        }
        case COMMENT:
        {
          __line += "<span class='comment'>" +  __buffer + "</span>";
          break;
        }
        case REG_EXP:
        {
          __line += "<span class='reg_exp'>" +  __buffer + "</span>";
          break;
        }
        default:
        {
          __line += __buffer;
        }
      }
      if(__type==IDENTIFIER)
      {
        __previous_type=__type;
        __previous_value = __buffer;
      }
      if (__has_hit_max_line_chars)
      {
        __line += " … ";
      }
    }
    __buffer='';
  }