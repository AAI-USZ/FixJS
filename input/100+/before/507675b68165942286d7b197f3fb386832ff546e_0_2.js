function(req, res) {
  req.nav.steps = [
    { url: '/docs', title: 'Documents' },
    { active: true, title: 'New'}
  ];
  
  res.render('admin', {
    nav: req.nav,
    metadata: {
      name: '',
      title: '',
      description: '',
      type: 'library',
      fields: [
        { 
          "name" : "name",
          "heading" : "Name",
          "placeholder" : "File Name",
          "type" : "Name",
          "required" : true,
          "default" : "",
          "formType" : "text" 
        },
      ],
    }
  })
}