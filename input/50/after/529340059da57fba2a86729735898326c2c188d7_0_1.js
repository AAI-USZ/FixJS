function(value) {
                                Selections.remove(value);
                                selections_holder.find('li[data-value = "' + escapeHtml(value) + '"]').remove();
                            }