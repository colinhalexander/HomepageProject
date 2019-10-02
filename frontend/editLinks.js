function enterEditMode() {
    makeExitButton();
    setUpTrashCan();
    makeListItemsDraggable();
}

function makeExitButton() {
    const button = document.querySelector('#edit-btn');
    button.innerHTML = `<img src="icons/close-icon.svg">Exit Editor`;
}

function setUpTrashCan() {
    const trashSection = document.querySelector('.trash');
    trashSection.style.display = "flex";

    const trash = document.querySelector('#trashcan');
    trash.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    trash.addEventListener('drop', (event) => {
        event.preventDefault();

        const draggedID = event.dataTransfer.getData("text");
        removeListItem(draggedID);

        const request = {method: "DELETE"};
        fetch(`http://localhost:3000/links/${draggedID}`, request);
    });
}

function exitEditMode() {
    const trashSection = document.querySelector('.trash');
    trashSection.style.display = "none";
    
    const button = document.querySelector('#edit-btn');
    button.innerHTML = `<img src="icons/edit-icon.svg">Edit Links`
}

function removeListItem(id) {
    const listItem = document.getElementById(`${id}`);
    listItem.parentElement.removeChild(listItem);
}

function makeListItemsDraggable() {
  const links = document.querySelectorAll('.links > li');
  const linkChildren = document.querySelectorAll('.links > li *');
  links.forEach(link => link.draggable = "true");
  linkChildren.forEach(link => link.draggable = "false");
  setUpDragListener();
}

function setUpDragListener() {
  const list = document.querySelector('.links');    
  list.addEventListener('dragstart', (event) => {
      const id = (event.target.id == "") ? 
          event.target.parentElement.id : 
          event.target.id;
      event.dataTransfer.setData("text", id);
  });
}