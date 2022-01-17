function(){return this.length||this.data.length||0;},sort:function(){this.data.sort(this.compareItems);},getNodeIndex:function(element){var index=element.getAttribute('index');if(typeof index!=="undefined"&&index!=null)
return parseInt(index)
else
return-1;},formatItem:function(itemData,index){var element=document.createElement('jolistitem');element.innerHTML=itemData;element.setAttribute("index",index);return element;}