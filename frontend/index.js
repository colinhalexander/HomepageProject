window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/folders")
    .then(response => response.json())
    .then(folders => createHomePage(folders))
});

function createHomePage(folders) {
  createFoldersList(folders);
  createLinks(getLinks(folders[0]));
  addFolderEventListener(folders);
  addNewFolderEventListener(folders);
  addFolderDropdownToLinkForm(folders)
  addLinkFormEventListener(folders);
  addNewLinkButtonEventListener();
  addEditLinksButtonEventListener();
}

function addFolderEventListener(folders) {
  const foldersList = document.querySelector('.folders');
  foldersList.addEventListener('click', (event) => {    
    if (event.target.className === "temp") {
        return;
    }
    
    closePreviousFolder();

    const id = getFolderID(event.target);

    const folder = folders.find(folder => folder["id"] == parseInt(id));
    const folderItem = (event.target.nodeName === "LI") ?
                       event.target :
                       event.target.parentNode;
    openFolder(folderItem);
    createLinks(getLinks(folder));
  });
}

function getFolderID(element) {
  let id = (element.id == "") ? 
          element.parentElement.id : 
          element.id;
  return id.split("-")[1];
}

function getLinks(folder) {
  return folder["links"];
}

function createFoldersList(folders) {
  const list = document.querySelector('.folders');
  const listItems = folders.map(folder => createFolder(folder));
  openFolder(listItems[0]);
  list.append(...listItems);
}

function openFolder(folder) {
  folder.firstChild.src = "images/folder-open.png";
  folder.classList.toggle("open");
}

function closePreviousFolder() {
  const folder = document.querySelector('.open');
  folder.firstChild.src = "images/folder.png";
  folder.classList.toggle("open");
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

function addEditLinksButtonEventListener() {
  const button = document.querySelector('#edit-btn');
  const trash = document.querySelector('.trash');
  button.addEventListener('click', () => {
    if (trash.style.display == "none") {
      enterEditMode();
    } else {
      exitEditMode();
    }
  });
}

function addNewLinkButtonEventListener() {
  const button = document.querySelector('#add-btn');
  const formDiv = document.querySelector('.addLink');
  button.addEventListener('click', () => {
    formDiv.style.display = "flex";
  })
}

function addFolderDropdownToLinkForm(folders) {
  const select = document.querySelector('#folder_id');
  const options = folders.map(folder => createOption(folder));
  select.append(...options);
}

function createOption(folder) {
  const option = document.createElement('option');
  option.value = `${folder.id}`
  option.innerText = `${folder.name}`
  return option;
} 

function addLinkFormEventListener(folders) {
  const form = document.querySelector('.linkForms');
  addCloseButton();
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const configObject = {
      method: "POST",
      body: formData
    };

    fetch("http://localhost:3000/links", configObject)
      .then(response => response.json())
      .then(link => addNewLink(link, folders));
    
    form.parentNode.style.display = "none";
  });
}

function addNewLink(link, folders) {
  const linkFolder = folders.find(folder => folder.id === link["folder_id"])
  
  if (linkFolder["links"]) {
    linkFolder["links"].push(link);
  } else {
    linkFolder["links"] = [link];
  }

  const linkFolderItem = document.querySelector(`#folder-${linkFolder.id}`);
  
  createLinks(linkFolder.links);
  closePreviousFolder();
  openFolder(linkFolderItem);
}

function addCloseButton() {
  const closeButton = document.querySelector('#close-btn');
  closeButton.addEventListener('click', () => {
    closeButton.parentNode.style.display = "none";
  });
}

function createLinks(links) {
  const list = document.getElementsByClassName("links")[0];
  list.innerHTML = "";
  const listItems = links.map(link => createLinkItem(link));
  list.append(...listItems);
}

function createLinkItem(link) {
  const listItem = document.createElement("li");
  listItem.id = link.id;

  const item = document.createElement("a");
  item.href = link.url;
  item.target = "_blank";

  const image = document.createElement("img");
  if (link.icon == "" || link.icon == null) {
    const faviconURL = fetchFavicon(link.url);
    image.src = `http://www.google.com/s2/favicons?domain=${faviconURL}`
  }
  else {
    image.src = link.icon
  };

  const title = document.createElement("p");
  title.innerText = link.title;
  item.append(image, title);
  listItem.appendChild(item);
  return listItem;
};

function fetchFavicon(url) {
  let hostname;
  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }
  return hostname;
  }

