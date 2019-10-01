function enterEditMode() {
    const list = document.querySelector('.links');
    const links = document.querySelectorAll('.links > li');
    const linkChildren = document.querySelectorAll('.links > li *');
    links.forEach(link => link.draggable = "true");
    linkChildren.forEach(link => link.draggable = "false");

    list.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData("text", event.target.id);
        console.log(event.target);
    });

    const trash = document.querySelector('#trashcan');
    trash.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    trash.addEventListener('drop', (event) => {
        event.preventDefault();
        console.log("drop event fired")

        const draggedID = event.dataTransfer.getData("text");
        removeListItem(draggedID);

        const request = {method: "DELETE"};
        fetch(`http://localhost:3000/links/${draggedID}`, request);
    });
}

function exitEditMode() {

}

function removeListItem(id) {
    const listItem = document.querySelector(`#${id}`);
    listItem.parentElement.removeChild(listItem);
}

function drag(event) {

}

function drop(event) {
    
}