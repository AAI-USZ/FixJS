function(form, index) {
  if (this.canOrder) {
    // Only pre-fill the ordering field for initial forms
    if (index !== null && index < this.initialFormCount()) {
      form.fields[ORDERING_FIELD_NAME] =
          IntegerField({label: 'Order', initial: index + 1,
                        required: false})
    }
    else {
      form.fields[ORDERING_FIELD_NAME] =
          IntegerField({label: 'Order', required: false})
    }
  }

  if (this.canDelete) {
    // Only add the deletion checkbox for initialized forms
    if (index !== null && index < this.initialFormCount()) {
      form.fields[DELETION_FIELD_NAME] =
          BooleanField({label: 'Delete', required: false})
    }
  }
}