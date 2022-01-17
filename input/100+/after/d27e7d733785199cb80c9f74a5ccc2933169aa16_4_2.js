function Validator($form){
    this.$form = $form;
    
    //Get all the required inputs
    this.inputs = $form.find(':input.required');
  }