export class Medication{


    constructor(medname = '', daysTaken = [], timesTaken = [], instructions = ''){
        this.medname = medname;
        this.daysTaken = daysTaken;
        this.timesTaken = timesTaken;
        this.instructions = instructions
    }

    setMedname(name){
        this.medname = name;
    }
    setDaysTaken(days = []){
        this.daysTaken = days;
    }
    setTimeTaken(times = []){
        this.timesTaken = this.times;
    }
    setInstructions(instructions=''){
        this.instructions = instructions;
    }

    getMedname(){
        return this.medname
    }
    setDaysTaken(){
        return this.daysTaken
    }
    setTimeTaken(){
        return this.timesTaken
    }
    setInstructions(){
        return this.instructions
    }

}

export class Medications{
    medications = []
    constructor(medications=[]){
        this.medications = medications
    }

    removeMedication(index){
        if(index.isNumber()){
            this.medications.splice(index,1)
        }else{
            this.medications= this.medications.filter(i=> i.medname != index)
        }
    }

    addMedication(medication){
        this.medications.push(medication)
    }

}