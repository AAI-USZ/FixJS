function(req, res) {
  req.nav.steps = [
    { url: '/lists', title: 'Lists' },
    { active: true, title: 'New'}
  ];
  
  res.render('admin', {
    nav: req.nav,
    metadata: {
      name: '',
      title: '',
      description: '',
      type: 'list',
      fields: [
        { 
          "name" : "name",
          "heading" : "Name",
          "placeholder" : "Name",
          "type" : "Name",
          "required" : true,
          "default" : "",
          "formType" : "text" 
        },
      ],
    }
  })
}