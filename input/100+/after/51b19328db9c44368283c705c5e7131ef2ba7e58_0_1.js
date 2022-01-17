function () {
        try{
         var DOMParser = require('xmldom').DOMParser;
         var doc = new DOMParser().parseFromString(datarequire,'text/xml');
         var sugs = doc.getElementsByTagName('suggestion');
         var sendarray = [];
         for(var i = 0; i < sugs.length; i++){
            sendarray.push(sugs.item(i).getAttribute('data'));
         }
         resi.send(JSON.stringify(sendarray));
       }catch(e){
        resi.send('[]');
        console.log(e);
       }
      }