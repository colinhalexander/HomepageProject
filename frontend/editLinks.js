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