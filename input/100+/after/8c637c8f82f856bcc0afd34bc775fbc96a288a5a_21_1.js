function(){



    this.properties=[];



    this.addProperty=function(target,property,value){

        var val=Rokkstar.parseAttribute(value,target._attributeTypes[property]);

        this.properties.push({target:target,value:val,property:property});

    }



    this.activate=function(){

        for(var i in this.properties){

            var target=this.properties[i].target;

            target["set"+this.properties[i].property.capitalize()].apply(target,[this.properties[i].value]);

        }

    }

}