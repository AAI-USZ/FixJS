function installModules(req,res,next) {

  // Manually grab the template
  var template = calipso.modules.admin.templates.install_modules;

  // Create the form
  var moduleForm = {id:'install-modules-form',title:'',type:'form',method:'POST',action:'/admin/install',
        fields:[
          {label:'',name:'installStep',type:'hidden'}
        ],
        buttons:[]}; // Submitted via template

  //Add the modules
  moduleForm.fields = createModuleFields(moduleForm.fields);
  
  // Defaults
  var formValues = {
    'modules:admin:enabled': true,
    'modules:content:enabled': true,
    'modules:contentTypes:enabled': true,
    'modules:user:enabled': true,
    'installStep':'done'
  }

  calipso.form.render(moduleForm, formValues, req, function(form) {
      calipso.theme.renderItem(req, res, template, 'admin.install.modules', {form:form}, next);
  });

}