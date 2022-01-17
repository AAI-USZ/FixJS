function AcceptTermsRequired_ClientValidate(sender, e) {
    e.IsValid = $("input[id*='BillingAcceptTerms']").is(':checked');
  }