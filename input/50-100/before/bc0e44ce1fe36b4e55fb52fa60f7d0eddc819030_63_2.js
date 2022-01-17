function close() {
        // reset identity/password fields
        if (identity)
          identity.value = '';
        if (password)
          password.value = '';
        if (showPassword)
          showPassword.checked = false;
        // 'close' (hide) the dialog
        document.body.classList.remove('dialog');
        dialog.classList.remove('active');
      }