function() {
    this.raw_resource = this.model.toTemplateJSON();
    var resource_object = {
        resource: this.raw_resource,
        num: this.options.position,
        resource_icon: '/images/icons/page_white.png',
        resourceTypeOptions: [
          ['file', CKAN.Strings.dataFile],
          ['api', CKAN.Strings.api],
          ['visualization', CKAN.Strings.visualization],
          ['image', CKAN.Strings.image],
          ['metadata', CKAN.Strings.metadata],
          ['documentation', CKAN.Strings.documentation],
          ['code', CKAN.Strings.code],
          ['example', CKAN.Strings.example]
        ]
    };
    // Generate DOM elements
    this.li = $($.tmpl(CKAN.Templates.resourceEntry, resource_object));
    this.table = $($.tmpl(CKAN.Templates.resourceDetails, resource_object));

    // Hook to changes in name
    this.nameBox = this.table.find('input.js-resource-edit-name');
    this.descriptionBox = this.table.find('textarea.js-resource-edit-description');
    CKAN.Utils.bindInputChanges(this.nameBox,this.updateName);
    CKAN.Utils.bindInputChanges(this.descriptionBox,this.updateName);
    // Hook to changes in format
    this.formatBox = this.table.find('input.js-resource-edit-format');
    CKAN.Utils.bindInputChanges(this.formatBox,this.updateIcon);
    // Hook to open panel link
    this.li.find('.resource-open-my-panel').click(this.openMyPanel);
    this.table.find('.js-resource-edit-delete').click(this.askToDelete);
    // Hook to markdown editor
    CKAN.Utils.setupMarkdownEditor(this.table.find('.markdown-editor'));

    // Set initial state
    this.updateName();
    this.updateIcon();
    this.setupDynamicExtras();
    this.hasErrors = false;
  }