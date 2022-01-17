function showAdd() {
    resetForm();
    deleteContactButton.classList.add('hide');
    formTitle.innerHTML = 'Add Contact';

    insertEmptyPhone(0);
    insertEmptyEmail(0);
    insertEmptyAddress(0);
    insertEmptyNote(0);

    edit();
  }