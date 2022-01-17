function ensureTemplateTemplates(context) {
  if (!templateTemplate) {
    templateTemplate = Handlebars.compile(context.config.attributes.templateTemplate || DEFAULT_TEMPLATE_TEMPLATE);
  }
  if (!precompiledTemplate) {
    precompiledTemplate = Handlebars.compile(context.config.attributes.precompiledTemplate || PRECOMPILED_TEMPLATE);
  }
}