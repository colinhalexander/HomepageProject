function addNewFolderEventListener() {
    const button = document.querySelector('.add-folder');
    button.addEventListener('click', () => {
        createNewFolderForm();
    });
}

function createNewFolderForm() {
    const li = document.createElement('li');
    li.className = "temp";
    const newFolderFormHTML = `
    <img class="temp" src="images/folder.png">
    <form class="folder-form temp">
        <input class="temp" id="name" name="name" placeholder="New Folder" autofocus></input>
    </form>
    `;
    li.innerHTML = newFolderFormHTML;

    const folderList = document.querySelector('.folders');
    folderList.appendChild(li);

    const form = document.querySelector('.folder-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const configObject = {method: "POST", body: formData};

        fetch("http://localhost:3000/folders", configObject)
            .then(response => response.json())
            .then(folder => createFolderAndReplaceForm(folder, li))
    });
}

function createFolderAndReplaceForm(folder, li) {
    const folderList = document.querySelector('.folders');
    const folderItem = createFolder(folder);
    folderList.removeChild(li);
    folderList.appendChild(folderItem);
}
