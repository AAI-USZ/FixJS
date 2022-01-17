function ensureTemplateTemplates(context) {
  if (!templateTemplate) {
    templateTemplate = handlebars.compile(context.config.attributes.templateTemplate || DEFAULT_TEMPLATE_TEMPLATE);
  }
  if (!precompiledTemplate) {
    precompiledTemplate = handlebars.compile(context.config.attributes.precompiledTemplate || PRECOMPILED_TEMPLATE);
  }
}