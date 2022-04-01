const fs = require('fs');

module.exports = app => {

    
    fs.readFile("Develop/db/db.json","utf8", (err, data) => {

        if (err) throw err;

        const notes = JSON.parse(data);

        
        // Setup the /api/notes get route
        app.get("/api/notes", function(req, res) {
            // return all saved notes as JSON.
            res.json(notes);
        });

        // Setup the /api/notes 
        app.post("/api/notes", function(req, res) {
            // Receives a new note then returns the new note
            const newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: "+newNote.title);
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });

        // Display notes.html 
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // Display index.html when all other routes are accessed
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates whenever a note is added 
        function updateDb() {
            fs.writeFile("Develop/db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}