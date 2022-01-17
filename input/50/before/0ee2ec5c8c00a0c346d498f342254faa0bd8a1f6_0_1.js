function(shader_name, shader_type) {
  var constant_name = "__import_"+shader_name+"_"+shader_type+"__";
  return "#ifndef "+constant_name+"\n" +
         "#define "+constant_name+" 1\n" +
           Jax.shader_data(shader_name)[shader_type] +
         "#endif\n"
}