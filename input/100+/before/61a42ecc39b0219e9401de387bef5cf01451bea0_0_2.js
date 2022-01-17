function () {
  var makeKwh, percentDisable, percentEnable;
  var kWhPrice = 0.01;

  $("#Annual_kWh").keyup(function () {
    makeKwh();
  });

  //Allow only numbers to be entered.
  $("#Annual_kWh").keydown(function (event) {
    // Allow: backspace, delete, tab, escape, and enter
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
    // Allow: Ctrl+A
    (event.keyCode == 65 && event.ctrlKey === true) ||
    // Allow: home, end, left, right
    (event.keyCode >= 35 && event.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    else {
      // Ensure that it is a number and stop the keypress
      if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault();
      }
    }
  });

  $(function () {
    $("#slider").slider({
      range: "min",
      min: 0,
      max: 100,
      value: 50,
      animate: false,
      step: 1,
      slide: function (event, ui) {
        sum = 0;
        // Add the slide event value
        sum += ui.value;

        if (sum < $("input[id*='MinPercent']").val()) {
          event.preventDefault();
        }
        //else $(this).next().html("Value: " + ui.value);
        makeKwh();
      },
      stop: function (event, ui) {
        makeKwh();
      }
    });
  });

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

  function percentDisable() {
    $("#PercentSelectSlider").hide('slow');
    $("#RequestQuoteMsg").show('fast');
  }

  function percentEnable() {
    $("#PercentSelectSlider").show('fast');
    $("#RequestQuoteMsg").hide('slow');
  }

  $('.percentChoice').click(function () {
    //    //alert('test');
    //    var all = $('.recChoiceButton');
    //    var selectBtn = $(this);
    //    //alert(this.name);
    //    all.removeClass('selected');
    //    $(selectBtn).addClass('selected');
    //    $('#ResidentialPrice').text($('input.monthlyPower', this).val() * kWhPrice);
  });

  $('.recChoiceButton').click(function () {
    //alert('test');
    var all = $('.recChoiceButton');
    var selectBtn = $(this);
    //alert(this.name);
    all.removeClass('selected');
    $(selectBtn).addClass('selected');
    $('#ResidentialPrice').text($('input.monthlyPower', this).val() * kWhPrice);
    $('input[id*="MonthCost"]').val($('input.monthlyPower', this).val() * kWhPrice);
    $('input[name="a3"]').val($('input.monthlyPower', this).val() * kWhPrice);

    //$('.percentChoice').hasClass('selected');

    $('input.monthlyPower', this).keyup(function () {
      var multiplier = $(this).siblings(".multiplier").eq(0).val(); //$('input.multiplier', this).val()
      var monthPower = ($(this).val() * multiplier) * kWhPrice;
      $('#ResidentialPrice').text(monthPower);
      $("input[id*='MonthCost']").val(monthPower);
      $('input[name="a3"]').val(monthPower);
      $(this).siblings('.amount').text('$' + (monthPower * 100) / 100 + ' monthly');
    });

    //Allow only numbers to be entered.
    $('input.monthlyPower', this).keydown(function (event) {
      // Allow: backspace, delete, tab, escape, and enter
      if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
      // Allow: Ctrl+A
    (event.keyCode == 65 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
    (event.keyCode >= 35 && event.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      else {
        // Ensure that it is a number and stop the keypress
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
          event.preventDefault();
        }
      }
    });



  });


  $(function () {
    makeKwh();
  });



}