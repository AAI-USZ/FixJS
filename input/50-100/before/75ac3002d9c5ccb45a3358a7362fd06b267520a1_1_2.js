function createEvent(the_event) {
    $.post(
      "/reservations",
      { reservation: { exchange_event_id: the_event.title,
                 cache_start_time: "" + the_event.start,
                 cache_end_time: "" + the_event.end,
                 person_id: the_event.description,
                 resource_id: 1
               }
      }
    );
    alert('successfully created a reservation!');
}