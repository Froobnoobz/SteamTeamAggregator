module.exports = class Team{
    /**
     * Used to structure the raw data read in from the JSON for writing to a file
     * @param {A single team object read in from the Json} team 
     */
    constructor( team )
    {
        this.id = team.id;
        this.name = team.name,
        this.sport = team.sport;
        //im preinitializing the students array so I can call push later on it with having to initialize it
        this.students = [];
    }
}