/*********** 
 * 
 * From editLinks:
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
 *
 * Planning:
 * - make list items draggabble from the start
 * - make set up folders function
 *  x prevent default on dragover
 *  x get list id from drop event and folder id from target/parent
 *  - send fetch PUT request to dragged link url with new folder_id, then:
 *      - remove link from previous folder in FOLDERS array
 *      - add link to new folder in FOLDERS array
 *      - 
 *  
************/

function setUpFoldersAsDropzone(folders) {
    const folderList = document.querySelector('.folders');

    folderList.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    folderList.addEventListener('drop', (event) => {
        if (!event.target.classList.contains("folders")) {
            event.preventDefault();

            const folder_id = (event.target.id == "") ? 
                        event.target.parentElement.id : 
                        event.target.id;
            console.log(folder_id);

            const draggedID = event.dataTransfer.getData("text");
            removeListItem(draggedID);

            const request = JSON.stringify({
                method: "PUT",
                body: {
                    "folder_id": `${folder_id}`
                }
            });

            fetch(`http://localhost:3000/links/${draggedID}`, request)
                .then(response => response.json())
                .then(link => updateFoldersObjectAndMoveLink(link, folders));
        }
    });
}

function updateFoldersObjectAndMoveLink(link, folders) {

}