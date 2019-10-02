window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/folders")
    .then(response => response.json())
    .then(folders => createHomePage(folders))
});

function createHomePage(folders) {
  createFoldersList(folders);
  createLinks(getLinks(folders[0]));
  addFolderEventListener(folders);
  addFormEventListener();
  addNewLinkButtonEventListener();
  addEditLinksButtonEventListener();
}

function addFolderEventListener(folders) {
  const foldersList = document.querySelector('.folders');
  const linksList = document.querySelector('.links');
  foldersList.addEventListener('click', (event) => {
    linksList.innerHTML = "";
    const id = (event.target.id == "") ? 
          event.target.parentElement.id : 
          event.target.id;
    console.log(id);
    const folder = folders.find(folder => folder["id"] == parseInt(id));
    createLinks(getLinks(folder));
  });
}

function getLinks(folder) {
  return folder["links"];
}

function createFoldersList(folders) {
  const list = document.querySelector('.folders');
  const listItems = folders.map(folder => createFolder(folder));
  list.append(...listItems);
}

function createFolder(folder) {
  const li = document.createElement('li');
  li.id = folder.id;
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

function addFormEventListener() {
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

function createLinks(links) {
  const list = document.getElementsByClassName("links")[0];
  const listItems = links.map(link => createLinkItem(link));
  list.append(...listItems)
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

