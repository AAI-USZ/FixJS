function(source, sections, css) {
    if (css == null) css = '';
    return template({
      title: baseFilename(source),
      sections: sections,
      project: { name: options.name, menu: menu },
      previewCSS: mincss(css) + previewCSS,
      previewJS: previewJS
    });
  }