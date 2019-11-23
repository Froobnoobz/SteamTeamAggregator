const Team = require( '../models/Team' );
const Student = require( '../models/Student' );

/*
    Where I was we used "Managers" for business logic specific functions,
    so in this case Im using a manager to handle all data aggregation for the teams
*/
module.exports = class TeamManager {
    
    /**
     * //setting the properties as global properties for the class so they can be set and accessed by all members
     * @param {The array that represents the teams students} teamWithStudents 
     * @param {The array which contains the team objects} team 
     * @param {The array of studente} students 
     */
    constructor( teamWithStudents, team, students )
    {
        this._studentTeams = teamWithStudents;
        this._teams = team;
        this._students = students;
    }

    /**
     * Given the team set in the constructor, we create our structured team object and find the students in the team
     */
    createTeams(){
        var returnArray = [];
        //for each team
        for( var i = 0; i < this._teams.length; i++ )
        {
            //create the team object
            var team = new Team( this._teams[i] );
            //then get all the students for the team
            team.students = this.findStudentsForTeam( this._teams[i].id );
            returnArray.push( team );
        }

        return returnArray;
     };

     /**
      * 
      * @param {The teamId that we want to get students by} teamId 
      */
     findStudentsForTeam( teamId ){
        //Find all students that belong to the team via the relational table
        var studentsForTeam = this._studentTeams.filter( student => student.teamId == teamId );
        //if no students for the class, return rather than waste computation
        if ( studentsForTeam.length == 0 ) return [];

        var returnArray = [];
        for( var i = 0; i < studentsForTeam.length; i++ )
        {
            //get student via their student id from the students array
            var student = this._students.find( student => student.id == studentsForTeam[i].studentId );
            //we skip adding students that are injured
            if( student.injured == false )
            {
                returnArray.push( new Student( student ) )
            }
        }
        //sort the return array via the fullName
        returnArray.sort(function(a, b){
            if(a.fullName < b.fullName) { return -1; }
            if(a.fullName > b.fullName) { return 1; }
            return 0;});

        return returnArray;
     };
}