document.querySelector('#voltarForm').addEventListener('click', defaultForm);

function defaultForm(event) {
  event.preventDefault();
  document.location.reload(true);
}