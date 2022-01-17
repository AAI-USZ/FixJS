function updateUserForm(req, res, template, block, next) {

  res.layout = 'admin';

  var isAdmin = (req.session.user && req.session.user.isAdmin);
  var User = calipso.db.model('User');
  var username = req.moduleParams.username;
  var roleSection = 3; // Update if changing sections

  if(isAdmin) {
      res.menu.adminToolbar.addMenuItem(req, {name:'Return',path:'return',url:'/user/profile/'+username,description:'Show user ...',security:[]});
  }

  var userForm = {
    id:'FORM',title:'Update Profile',type:'form',method:'POST',tabs:true,action:'/user/profile/' + username,
    sections:[
      {
        id:'form-section-core',
        label:'Profile',
        fields:[
          {label:'Username', name:'user[username]', type:'text', readonly:!isAdmin},
          {label:'Full Name', name:'user[fullname]', type:'text'},
          {label:'Email', name:'user[email]', type:'text'},
          {label:'Language', name:'user[language]', type:'select', options:req.languages}, // TODO : Select based on available
          {label:'About You', name:'user[about]', type:'textarea'},
        ]
      },
      {
        id:'form-section-about',
        label:'Password',
        fields:[
          {label:'Old Password', name:'user[old_password]', type:'password',description:req.t('Leave blank if not changing password.')},
          {label:'New Password', name:'user[new_password]', type:'password'},
          {label:'Repeat Password', name:'user[repeat_password]', type:'password'}
        ]
      },
      {
        id:'form-section-privacy',
        label:'Privacy',
        fields:[
          {label:'Show Full Name', name:'user[showName]', type:'select',options:[
            {label:'Never',value:'never'},
            {label:'Registered Users Only',value:'registered'},
            {label:'Public',value:'public'}
          ]},
          {label:'Show Email', name:'user[showEmail]', type:'select',options:[
            {label:'Never',value:'never'},
            {label:'Registered Users Only',value:'registered'},
            {label:'Public',value:'public'}
          ]}
        ]
      },
      {
        id:'form-section-roles',
        label:'Roles',
        fields:[]
      }
    ],
    buttons:[
      {name:'submit', type:'submit', value:'Save Profile'}
    ]
  };

  // Quickly check that the user is an admin or it is their account
  if(req.session.user && (req.session.user.isAdmin || req.session.user.username === username)) {
    // We're ok
  } else {
    req.flash('error',req.t('You are not authorised to perform that action.'));
    res.redirect('/');
    return;
  }

  User.findOne({username:username}, function(err, u) {

    // Allow admins to register other admins
    if(req.session.user && req.session.user.isAdmin) {

      // Role checkboxes
      var roleFields = [];
      calipso.data.roleArray.forEach(function(role) {
        roleFields.push(
          {label:role, name:'user[roleList][' + role + ']', type:'checkbox', description:calipso.data.roles[role].description, checked:calipso.lib._.contains(u.roles,role)}
        );
      });

      userForm.sections[roleSection].fields.push({
        type: 'fieldset',
        name: 'roles_fieldset', // shouldn't need a name ...
        legend: 'User Roles',
        fields: roleFields
      });

    } else {
      // remove the section
      delete userForm.sections[roleSection];
    }

    var values = {user:u};

    calipso.form.render(userForm,values,req,function(form) {
      calipso.theme.renderItem(req, res, form, block, {}, next);
    });

  });

}