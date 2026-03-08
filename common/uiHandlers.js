/** @virtual */
function onClick() {
  const issue = checkAnswers();
  showMessage(issue);
  if (!issue) {
    showResult();
    onShowResult();
  }
}

function onShowResult() {
  document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}
