// Use `fs` for reading data files and writing the result to `result.out`
const fs = require('fs');
const FileManager = require( './managers/FileManager' );
const TeamManager = require( './managers/TeamManager' );
/**
 * The main program function.
 */
function executeProgram() {
  try
  {
    //I did notice that it was specified to use sync though so I guess you're okay with blocking in this simple program
    //read in the three files ready for processing, wrapping json parse around the return result of file read.
    var students = JSON.parse( FileManager.readFile( "./data/students.json" ) );
    var teams = JSON.parse( FileManager.readFile( "./data/teams.json" ));
    var studentTeams = JSON.parse( FileManager.readFile( "./data/student-teams.json" ) );

    //Initialize the team manager, I could simiplify this down two one line where I can pass in the props to the create team function
    //but would rather have a constructor for readability
    var teamManager = new TeamManager( studentTeams, teams, students );
    //Creating the team object for file writing
    var teams = { "teams": teamManager.createTeams() };
    //specify double spacing for the json as to match the expected output
    FileManager.writeFile( "result.json", JSON.stringify( teams, null, 2 ) );
  }
  catch( err )
  {
    console.log( err );
  }
}

// Run the programs
executeProgram();

/* for the sake of also trying to learn node, I did try an async version with promises */

// const filesToRead = [
//   fileManager.readFileAsync( "./data/students.json" ),
//   fileManager.readFileAsync( "./data/teams.json" ),
//   fileManager.readFileAsync( "./data/student-teams.json" )
// ];

// //Im not too sure how the best approach for this in node, so I think to avoid blocking I should handle the file reading async,
// //then when all of those promises have resolved I can aggregate the data
// Promise.all( filesToRead ).then( ( fileResults ) => {
//   var students = JSON.parse( fileResults[0] );
//   var teams = JSON.parse( fileResults[1] );
//   var studentTeams = JSON.parse( fileResults[2] );

//   var teamManager = new TeamManager( studentTeams, teams, students );
//   var teams = { "teams": teamManager.createTeams() };
//   fileManager.writeFile( "result.json", JSON.stringify( teams ) );
// } );
