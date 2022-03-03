/**
 * Model that contains the inner structure of a Tea object
 */
export class TeaModel{
    /**
     * Constructor that initializes the model attributes
     * 
     * @param {*} teaType used for identifying the tyoe of tea
     * @param {*} teaFlavor used for identifying the flavor of tea
     * @param {*} teaMessage used for identifying the message that comes with the tea
     */
    constructor(teaType, teaFlavor, teaMessage){
        this.teaType = teaType;
        this.teaFlavor = teaFlavor;
        this.teaMessage = teaMessage;
    }

    //Setters for setting the model data
    setTeaType(teaType){
        this.teaType = teaType;
    }

    setTeaFlavor(teaFlavor){
        this.teaFlavor = teaFlavor;
    }

    setTeaMessage(teaMessage){
        this.teaMessage = teaMessage;
    }

    //Getters for getting the model data 
    getTeaType(){
        return this.teaType;
    }

    getTeaFlavor(){
        return this.teaFlavor;
    }

    getTeaMessage(){
        return this.teaMessage;
    }
}