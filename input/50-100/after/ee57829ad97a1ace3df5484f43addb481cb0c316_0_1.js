function(id){
        if(!this.objects[id]) return this.undefLink;
        var ob = this.objects[id], 
            shortDesc = "", title = "object " + id, text = "";
        if(ob.title) title = ob.title;    
        if(ob.shortDescription) shortDesc = ob.shortDescription();
        
        text += "<a onclick='"+this.callbackName+"(\""+id+"\");'>";
        text += title +"</a>:" + shortDesc;
        return text;
    }