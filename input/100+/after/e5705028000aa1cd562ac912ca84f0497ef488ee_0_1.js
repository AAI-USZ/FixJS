function(options) {
  if(!options) return;
  options = options || {};

  options.controller = utils.string.decapitalize(options.controller);

  var names = utils.string.inflection(options.controller)
    , idActions = ['show', 'edit']
    , name, action;

  // Return if the action isn't one that should be added
  if(!utils.array.included(options.action, ['index', 'add', 'show', 'edit'])) return;

  // Default action function
  action = helpersBase.urlFor.action(options);

  // If action requires Id then change the default action
  if(utils.array.included(options.action, idActions)) {
    action = function(id) {
      options.id = id;
      return helpersBase.urlFor.action(options);
    };
  }

  // Set the helper names for each action
  if(options.action === 'index') name = names.property.plural + 'Path';
  if(options.action === 'add') name = 'add' + names.constructor.singular + 'Path';
  if(options.action === 'show') name = names.property.singular + 'Path';
  if(options.action === 'edit') name = 'edit' + names.constructor.singular + 'Path';

  items[name] = {
    name: name,
    action: action
  }
}