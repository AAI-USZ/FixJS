function makeKwh() {
    var sliderValue = $("#slider").slider("value");
    var annualkWh = $("#Annual_kWh").val();
    var minPercent = 0;
    var annualkWhExists = false;

    if ($.trim($("#Annual_kWh").val()).length <= 2) {
      annualkWhExists = false;
    } else {
      annualkWhExists = true;
    }

    if (annualkWhExists) {
      if (annualkWh <= 200000) {
        minPercent = 20;
        percentEnable();
      }
      else if (annualkWh > 200000 && annualkWh <= 300000) {
        minPercent = 15;
        percentEnable();
      }
      else if (annualkWh > 300000 && annualkWh <= 400000) {
        minPercent = 10;
        percentEnable();
      }
      else if (annualkWh > 400000 && annualkWh <= 500000) {
        minPercent = 5;
        percentEnable();
      }
      else {
        minPercent = 100;
        percentDisable();
      }

      var handleX = $(".ui-slider-handle").css('left');
      $("#valueMarker").css('left', handleX);
      $("#valueMarker span").text(handleX);
      var totalAnnualkWh = Math.round((sliderValue / 100) * annualkWh);
      var totalMonthlyPrice = Math.round(((((sliderValue / 100) * annualkWh) * kWhPrice) / 12) * 100) / 100;
      $("#totalLabel").text(totalAnnualkWh + " kWh/year\n$" + totalMonthlyPrice + "/month");

      //Hidden Field Values
      $("input[id*='AnnualkWh']").val(annualkWh);
      $("input[id*='Percent']").val(sliderValue);
      $("input[id*='MinPercent']").val(minPercent);
      $("input[id*='AnnualPercent']").val(totalAnnualkWh);
      $("input[id*='MonthCost']").val(totalMonthlyPrice);
      $("input[id*='a3']").val(totalMonthlyPrice);

    } else {
      $("#PercentSelectSlider").hide('slow');
      $("input[id*='Percent']").val(0);
      $("input[id*='MinPercent']").val(0);
    }
  }