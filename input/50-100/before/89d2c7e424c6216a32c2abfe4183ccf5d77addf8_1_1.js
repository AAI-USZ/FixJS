function() {
      var format = $('option:selected', "#export_format").val();
      if (format !== "") {
        var code_generator = new CodeGenerator();
        debugger
        var code = code_generator.generate(this.getCommandList(), format, {
           class_name: $("#export_class_name").val()
          ,base_url: $("#base_url").val()
          ,chrome_driver_file_path: $("#chrome_driver_file_path").val()
        });
        $("#testcode").text(code);
      }
    }