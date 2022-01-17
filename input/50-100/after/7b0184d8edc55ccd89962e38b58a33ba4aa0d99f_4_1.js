function() {
    createController({
      siteName: RP_NAME,
      privacyPolicy: RP_PP_URL,
      termsOfService: RP_TOS_URL
    });

    equal($("#rp_name").text(), RP_NAME, "RP's name is set");
    equal($("#rp_tos").attr("href"), RP_TOS_URL, "RP's TOS is set");
    equal($("#rp_pp").attr("href"), RP_PP_URL, "RP's Privacy Policy is set");
  }