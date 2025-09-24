/** @virtual */
function onClick() {
  const issue = checkAnswers();
  showMessage(issue);
  if (!issue) {
    showResult();
  }
}