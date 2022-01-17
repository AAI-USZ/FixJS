function(service, title, type, messages, filter)
  {
    return (
    [
      ['h3', title],
      ['ul',
        messages.map(this._template_checkbox_message, filter),
        'data-filter-type', type,
        'data-service-name', service,
      ],
    ]);
  }