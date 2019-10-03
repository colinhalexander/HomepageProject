# Homepage Project
Designed by Danika Butterfield and Colin Alexander

# Description
This project is a customizable browser homepage where a user can add links to websites, delete links, and create folders to organize their links. Links can be relocated by dragging and dropping to a new folder and deleted by clicking the "edit links" button then dragging them to the trashcan icon. Users can also choose from several themes.

The app runs on a RESTful Rails API (Rails version 6.0.0) accessed by a vanilla JavaScript frontend. The app is fully single-page with persistent data that tracks new links and folders, relocated links, and deleted links.

# Set Up
To set up this project, enter the backend directory via the Command Line. Run "rails db:migrate" then "rails db:seed" to set up the database. This will create the database that stores the app's data then load it with a Default folder containing a few links to get you started. Then, navigate to the frontend directory via the Command Line and run "lite-server" to open the project in your browser.

Enjoy!
