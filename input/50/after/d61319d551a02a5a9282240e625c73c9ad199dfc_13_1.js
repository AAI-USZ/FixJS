function onSubmit() {
     if (!dom.hasClass("body", "submit_disabled") && this.validate()) {
       this.submit();
     }
     return false;
   }