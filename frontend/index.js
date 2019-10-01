window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/links")
    .then(response => response.json())
    .then(links => createHomePage(links))
});

function createHomePage(links) {
  createLinks(links);
  addFormEventListener();
  addNewLinkButtonEventListener();
  enterEditMode();
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
    console.log(formData);
    const configObject = {
      method: "POST",
      body: formData
    };

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
  filteredLinks = links.filter(link => link.url != null);
  const listItems = filteredLinks.map(link => createLinkItem(link));
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

