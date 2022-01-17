function (data) {
  console.log("question: ", data)
  question_id = data.id;
  div_question_display.textContent = data.question;
}