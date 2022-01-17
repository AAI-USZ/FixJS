function updatePlanEl(rowEl, planEl, serviceType) {
    var planTypes = HOSTING_SERVICES[serviceType].plans,
        selectedPlan = planEl.val(),
        i;

    planEl.empty();

    if (planTypes.length === 1) {
        rowEl.hide();
    } else {
        for (i = 0; i < planTypes.length; i++) {
            var planType = planTypes[i],
                opt = $('<option/>')
                    .val(planType.type)
                    .text(planType.label)
                    .appendTo(planEl);

            if (planType.type === selectedPlan) {
                opt.attr('selected', 'selected');
            }
        }

        rowEl.show();
    }

    planEl.triggerHandler('change');
}