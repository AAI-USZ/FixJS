function changedURL(event)

{

   //alert(location.href);

   if(trackURL == true)

   {

      if(location.href.indexOf("#compose") != -1)

      {

         //alert('in compose');

         putButtons();

      }

   }

   else

   {

      if(location.href.indexOf("#compose") == -1)

      {

          //alert('out of compose');

          trackURL = true;

     }

   }

}