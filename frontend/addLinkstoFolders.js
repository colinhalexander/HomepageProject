/*********** 
 * Planning:
 * x make list items draggabble from the start
 * x make set up folders function
 *  x prevent default on dragover
 *  x get list id from drop event and folder id from target/parent
 *  - send fetch PUT request to dragged link url with new folder_id, then:
 *      - remove link from previous folder in FOLDERS array
 *      x add link to new folder in FOLDERS array
************/

function setUpFoldersAsDropzone(folders) {
    const folderList = document.querySelector('.folders');

    folderList.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    folderList.addEventListener('drop', (event) => {
        if (!event.target.classList.contains("folders")) {
            event.preventDefault();

            const draggedID = event.dataTransfer.getData("text");
            
            let folder_id = (event.target.id == "") ? 
                        event.target.parentElement.id : 
                        event.target.id;
            folder_id = folder_id.split("-")[1];
            
            const request = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "folder_id": folder_id
                })
            };

            fetch(`http://localhost:3000/links/${draggedID}`, request)
                .then(response => response.json())
                .then(link => moveLinkToNewFolder(link, folders));
        }
    });
}

function moveLinkToNewFolder(link, folders) {
    addNewLink(link, folders);
    removeLinkFromOldFolder(link, folders);
    removeListItem(link.id);
}

function removeLinkFromOldFolder(link, folders) {
    const oldFolderID = document.querySelector('.open').id.split("-")[1];
    const oldFolder = folders.find(folder => folder.id === parseInt(oldFolderID));
    oldFolder.links = oldFolder.links.filter(folderLink => folderLink.id !== link.id);
}