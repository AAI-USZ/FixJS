function ensureModuleTemplates(context) {
  if (!moduleStartTemplate) {
    moduleStartTemplate = handlebars.compile(context.config.attributes.moduleStartTemplate || DEFAULT_MODULE_START_TEMPLATE);
  }
  if (!moduleEndTemplate) {
    moduleEndTemplate = handlebars.compile(context.config.attributes.moduleEndTemplate || DEFAULT_MODULE_END_TEMPLATE);
  }
}