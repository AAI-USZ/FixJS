function(label, options){
    options = options || {};
    if (options['skip_decorations'])
      return label;
      
    html = [];
    html.push("<tr8n ");
    
    if (this.id) 
      html.push(" translation_key_id='" + this.id + "' ");
      
    if (this.key) 
      html.push(" id='" + this.key + "' ");
  
    var klasses = ['tr8n_translatable'];
    
    if (this.original)
      klasses.push('tr8n_not_translated');
    else  
      klasses.push('tr8n_translated');

    if (Tr8n.SDK.Proxy.inline_translations_enabled && this.id)
      html.push(" class='" + klasses.join(' ') + "'");
      
    html.push(">");
    html.push(label);
    html.push("</tr8n>");
    return html.join("");
  }