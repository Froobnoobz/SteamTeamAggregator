module.exports = class Student{
    /**
     * Used to structure the raw data read in from the JSON for writing to a file
     * @param {A single student object read in from the Json} student 
     */
    constructor( student )
    {
        this.id = student.id,
        //given we have the student object, we can concat the name here
        this.fullName = student.firstName + " " + student.lastName;
        //omitting the injured property as the class is used to house only data we want to write to the file
    }

    //Side note, since i'm new to Node, I'm wondering whats the standard for setting properties?
    //I know in typescript it would be explicitly declared but is the above approach correct for setting properties?
}