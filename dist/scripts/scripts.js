const addedFilesList = document.querySelector("#added-files-list");
const filesInput = document.querySelector('input[name="details-files"]');
filesInput.addEventListener("input", function(event) {
  let filenames = "";
  for (let file of event.currentTarget.files) {
    filenames += `<li>${file.name}</li>
`;
  }
  addedFilesList.innerHTML = filenames;
});
