/*********** 
 * Planning:
 * - make list items draggabble from the start
 * - make set up folders function
 *  x prevent default on dragover
 *  x get list id from drop event and folder id from target/parent
 *  - send fetch PUT request to dragged link url with new folder_id, then:
 *      - remove link from previous folder in FOLDERS array
 *      - add link to new folder in FOLDERS array
 *      - 
************/

function setUpFoldersAsDropzone(folders) {
    const folderList = document.querySelector('.folders');

    folderList.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    folderList.addEventListener('drop', (event) => {
        if (!event.target.classList.contains("folders")) {
            event.preventDefault();

            let folder_id = (event.target.id == "") ? 
                        event.target.parentElement.id : 
                        event.target.id;
            folder_id = folder_id.split("-")[1];
            console.log(folder_id);
            
            const draggedID = event.dataTransfer.getData("text");

            const request = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "folder_id": folder_id
                })
            };
            console.log(request);

            fetch(`http://localhost:3000/links/${draggedID}`, request)
                .then(response => response.json())
                .then(link => addNewLink(link, folders));
        }
    });
}