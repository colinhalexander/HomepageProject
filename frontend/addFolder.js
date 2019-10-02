function newFolderFormEventListener() {
    const form = document.querySelector('.linkForms');
    addCloseButton();
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const configObject = {
        method: "POST",
        body: formData
        };
        console.log(configObject);

        fetch("http://localhost:3000/links", configObject)
        .then(response => response.json())
        .then(link => addNewLink(link));
        
        form.parentNode.style.display = "none";
    });
}
  
function addCloseButton() {
    const closeButton = document.querySelector('#close-btn');
    closeButton.addEventListener('click', () => {
      closeButton.parentNode.style.display = "none";
    });
}
  
function addNewLink(link) {
    const newListItem = createLinkItem(link);
    const list = document.querySelector('.links');
    list.appendChild(newListItem);
}

/*
<li>
    <img src="images/folder.png">
    <form class="folder-form">
        <input id="name" name="name" placeholder="New Folder"></input>
    </form>
</li>
*/

function createNewFolderForm() {
    const li = document.createElement('li');
    const newFolderFormHTML = `
    <img src="images/folder.png">
    <form class="folder-form">
        <input id="name" name="name" placeholder="New Folder"></input>
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
    const folderItem = createFolder(folder);
    li.innerHTML = folderItem.innerHTML;
}

function createFolder(folder) {
    const li = document.createElement('li');
    li.id = `folder-${folder.id}`;
    const img = document.createElement('img');
    img.src = "images/folder.png";
    const p = document.createElement('p');
    p.innerText = folder.name;
  
    li.append(img, p);
    return li;
  }