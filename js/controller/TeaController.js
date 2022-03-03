/**
 * Controller class that is used to get methods from View and show it to the user by using different 
 * EventHandlers
 */
export class TeaController{

    /**
     * Constructor inside which the different EventListeners are being initialized
     * With them, the data is being shown to the user 
     * 
     * @param {*} model used to fetch the model 
     * @param {*} view used to fetch elements from the view
     */
    constructor(model, view){
        this.model = model;
        this.view = view;

        //When the window is scroller, the method for changing the navbar is called
        window.onscroll = () => {
            this.view.changeNavbar();
        };

        //EventListener for handling clicking of the first select
        this.view.teaSelect.addEventListener('click', event => {
            this.view.resetSelectLength(this.view.flavorSelect);
            this.view.resetSelectLength(this.view.messageSelect);
            this.view.createOption(this.view.teaSelect, this.view.flavorSelect, this.view.teaData);
            this.view.changeImage(this.view.teaSelect);
            this.loadStorageData();
        })

        //EventListener for handling clicking of the second select
        this.view.flavorSelect.addEventListener('click', event => {
            this.view.resetSelectLength(this.view.messageSelect);
            this.view.createMessageOption(this.view.flavorSelect, this.view.messageSelect, this.view.teaData);
            this.view.changeImage(this.view.flavorSelect);
            this.loadStorageData();
        })

        //EventListener for handling clicking of the third select
        this.view.messageSelect.addEventListener('click', event => {
            this.view.changeImage(this.view.messageSelect);
            this.loadStorageData();
        })

        //For each loop that is used to update the local storage depending on the change of the select
        this.view.allSelects.forEach((select) => {
            select.onchange = this.updateStorage.bind(this, select);
        });

        //Used to load the data from the storage
        this.loadStorageData();

        //Event listener for clicking the final order button (inside of it are the initialized validation methods)
        this.view.button.addEventListener('click', event => {
            this.validateForm(this.view.firstName);
            this.validateForm(this.view.lastName);
            this.validateNumber(this.view.number);
            this.validateSelects(this.view.teaSelect.value);
            this.validateSelects(this.view.flavorSelect.value);
            this.validateSelects(this.view.messageSelect.value);
            //If all of these validations return true, the modal is initialized and the first and last names of the user who ordered will be shown in it
            if(this.validateForm(this.view.firstName) && this.validateForm(this.view.lastName) && this.validateNumber(this.view.number)
            && this.validateSelects(this.view.teaSelect.value) && this.validateSelects(this.view.flavorSelect.value) && this.validateSelects(this.view.messageSelect.value)){
                this.view.initModal();
                this.view.addNameInfo(this.view.firstName.value, this.view.lastName.value);
                this.view.resetForm(this.view.firstName);
                this.view.resetForm(this.view.lastName);
                this.view.resetForm(this.view.number);
            }
        })
    }

    /**
     * Method used for storing selects in the local storage
     * 
     * @param {*} select is used to grab the value of it and store it in the local storage
     */
    updateStorage(select){
        this.model[select.id] = select.value;
        let jsonTea = JSON.stringify(this.model);
        window.localStorage.setItem('tea', jsonTea);
    }

    /**
     * Method used for storing values from the form inside the local storage
     * 
     * @param {*} input is used to get the value of the input inside the form and store it inside the form 
     * seperately
     */
    updateFormStorage(input){
        window.localStorage.setItem(`${input.name}`, input.value);
    }

    /**
     * Method used for loading select data from the local storage to an existing textarea
     */
    loadStorageData(){
        let storageData = localStorage.getItem('tea');
        let storageArr = JSON.parse(storageData);
        if(storageData){
            this.view.textArea.value = `TEA TYPE: ${storageArr.teaType}    TEA FLAVOR: ${storageArr.teaFlavor}    QUOTE FROM: ${storageArr.teaMessage}`;
        }
        else{
            this.view.textArea.value = "Local storage is empty";
        }
    }

    /**
     * Method used for validating the inputs inside the form
     * 
     * @param {*} input is used to get the input from the form and is checked to see if it is empty
     */
    validateForm(input){
        let inputValue = input.value;
        if(inputValue === " " || inputValue.trim().length === 0){
            this.view.validationMessage(input);
        }
        else{
            this.view.removeValMessage(input);
            this.updateFormStorage(input);
            return true;
        }
    }

    /**
     * Method used for validating the phone number specifically
     * 
     * @param {*} input is used to get the input from the form and is checked to see if it is empty
     */
    validateNumber(input){
        let inputValue = input.value;
        if(!inputValue.match(/^\d{10}$/)){
            this.view.validationMessage(input);
        }
        else{
            this.view.removeValMessage(input);
            this.updateFormStorage(input);
            return true;
        }
    }

    /**
     * Method used for checking if the selects were selected properly
     * 
     * @param {*} selectValue is used to get the values of the selects 
     */
    validateSelects(selectValue){
        if(selectValue === 'teaType' || selectValue === 'teaFlavor' || selectValue === 'teaMessage'){
            this.view.validateSelect();
        }
        else{
            this.view.removeValidationSelect();
            return true;
        }
    }
}