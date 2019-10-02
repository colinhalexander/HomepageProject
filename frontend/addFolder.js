function addNewFolderEventListener(folders) {
    const button = document.querySelector('.add-folder');
    button.addEventListener('click', () => {
        if (!button.classList.contains("cancel")) {
            changeAddButtonToCancel(button);
            createNewFolderForm(folders);
        } else {
            changeCancelButtonToAdd(button);
            removeNewFolderForm();
        }
    });
}

function removeNewFolderForm() {
    const folderList = document.querySelector('.folders');
    folderList.removeChild(folderList.lastChild);
}

function changeCancelButtonToAdd(button) {
    button.classList.toggle("cancel")

    const img = document.querySelector(".add-folder > img");
    img.style.transform = "";

    const textBox = document.querySelector(".add-folder > p")
    textBox.innerText = "Add Folder";
}

function changeAddButtonToCancel(button) {
    button.classList.toggle("cancel");

    const img = document.querySelector(".add-folder > img");
    img.style.transition = "1s";
    img.style.transform = "rotate(405deg)";
    
    const textBox = document.querySelector(".add-folder > p")
    textBox.innerText = "Cancel"
}

function createNewFolderForm(folders) {
    const li = document.createElement('li');
    li.className = "temp";
    li.innerHTML = `
    <img class="temp" src="images/folder.png">
    <form class="folder-form temp">
        <input class="temp" id="name" name="name" placeholder="New Folder" autofocus></input>
    </form>
    `;

    const folderList = document.querySelector('.folders');
    folderList.appendChild(li);

    const form = document.querySelector('.folder-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const configObject = {method: "POST", body: formData};

        fetch("http://localhost:3000/folders", configObject)
            .then(response => response.json())
            .then(folder => createFolderAndReplaceForm(folder, folders, li));
    });
}

function createFolderAndReplaceForm(folder, folders, li) {
    const folderList = document.querySelector('.folders');
    const folderItem = createFolder(folder);
    folderList.removeChild(li);
    folderList.appendChild(folderItem);
    folders.push(folder);
    addFolderDropdownToLinkForm(folders);
}
