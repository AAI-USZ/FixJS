function createDefineBlock(codeObject){
        var block ="<table class=\"Define\" style=\"background: " + colors.Define +";\"" + " id=\""+codeObject.id+"\">";
        //contract
        block+="<tr><th><input id=\"name\"></th><th> : </th><th>"+generateTypeDrop()+"</th><th> <button class=\"buttonPlus\">+</button> </th><th> -> </th><th>"+generateTypeDrop()+"</th></th></tr>";
        //define block
        block+="<tr><th>define</th>";
        block+="<th class=\"expr\"> <input type=\"Name\" id=\"Name\" name=\"Name\"/><th class=\"expr\">args <th  class=\"expr\">expr";
        return block + "</tr></table>";
}