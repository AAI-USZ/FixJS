function get_desc() {
      // Sets Qr default to cabel size
      var $desc="Size:"+$code+$('#unit :selected').val();
      switch ($qr) {
         case 0:
            $desc=make_qr_gig_label();
         break;
         case 1: // tel
            $desc=make_qr_tel();
         break;
         case 2: //url
            $desc=make_qr_url();
         break;
         case 3: //email
            $desc=make_qr_email();
         break;
         case 4: $desc=make_vcard(); break;
      }
      return $desc;
   }