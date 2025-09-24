/** @virtual */
function checkAnswers(form) {
  form ??= getQuizForm();
  const formData = new FormData(form);
  if (Array.from(formData.values()).length < quiz.questions.length) {
    return '尚有題目未作答';
  }
}

/** @virtual */
function getQuizForm() {
  return document.getElementById("quizForm");
}

// show message

function showMessage(message) {
  const msgContainer = getMessageEl();
  msgContainer.textContent = message;
}

/** @virtual */
function getMessageEl() {
  return document.getElementById('message');
}
