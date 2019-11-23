const fs = require('fs');
/*
    Where I was we used "Managers" for business logic specific functions,
    so in this case Im using a manager to handle all file i/o, and I dont have it as a class as its a static object and has no internal state
*/
module.exports = {
    
    /**
     * Read the specified file in sync
     * @param {The file name (including the path)} fileName 
     */
    readFile: function( fileName )
    {
        return fs.readFileSync(fileName );
    },

    /**
     * Read the specified file in async
     * @param {The file name (including the path)} fileName 
     */
    readFileAsync: function( fileName )
    {
        //return the file read result as a promise so it does not block
        return new Promise( function( resolve, reject ) {
            fs.readFile(fileName, function(err, contents) {
                if( err ) reject( err );

                resolve(contents);
            });
        } );
    },

    /**
     * Write content to specified file
     * @param {The name that we want the file to be called} fileName 
     * @param {The string content of what is to be written to the file} content 
     */
    writeFile: function( fileName, content )
    {
        fs.writeFile(fileName, content, function (err) {
            if (err) {
                console.log("An error occured while writing to file");
                return console.log(err);
            }
         
            console.log("File has been saved.");
        });
    }
  };
