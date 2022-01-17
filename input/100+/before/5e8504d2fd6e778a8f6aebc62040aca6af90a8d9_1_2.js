function($){



  if ( jQuery('#editor').length == 0 ) {

      //no need to initialize

      return false;

  }

  

  /**

   * Contains the errors

   *

   * @var

   * @access public

   * @type string

   */

   this.rowErrorMap = {};

   

  /**

   * Scope duplicator / parent this

   *

   * @var

   * @access private

   * @type object

   */

   var that = this;

  

  /**

  * Constructor

  *

  * Initializes the editor

  *

  * @access public

  * @return void

  */

  this.init = function() {

  };

  

  this.getCompileMessages = function(messages){

    var msgs = [];

    for ( var i = 0; i < messages.length; i++ ) {

      if ( IDE.htwg.editor._fileName === messages[i].source ){

        msgs.push({

            row: messages[i].row - 1,

            column: messages[i].column,

            text: messages[i].text,

            type: messages[i].type

        });

      }

    }

    return msgs;

  };



  this.getErrorSourceFiles = function(messages){

    var errorFiles = [];

    for ( var i = 0; i < messages.length; i++ ) {

      errorFiles.push(messages[i].source);

    }

    

    var result = [];

    $.each(errorFiles, function(i,v){

        if ($.inArray(v, result) == -1) result.push(v);

    });

    return result;

  };

  

  this.setErrorFileIcons = function(messages){

    var errorFiles = this.getErrorSourceFiles(JSON.parse(messages));

    $("#browser").find('li').each(function(i, elem){      

      if ( jQuery.inArray($(elem).attr("title"), errorFiles) > -1 ){

        elemError = $('<span class="errorFile"></span>');

        elemError.insertBefore($(elem).find('ins').first());

      }

      else{

        $(elem).find('span').remove();

      }

    });

  }

  

  this.setErrors = function(messages) {

    var errors = this.getCompileMessages(JSON.parse(messages));

    window.aceEditor.getSession().clearAnnotations();

    window.aceEditor.getSession().setAnnotations(errors);

  };

  

  /* could implement a little textbox with the errormsg */

  this.showErrors = function( editor ){

  };

  

  this.init();    

}