/**
 * View class that is used to contain methods needed for the website to function, but does
 * not initialize them 
 */
export class TeaView{

    /**
     * Constructor in which all the view's attributes are initialized and used throughout the class 
     * and the controller class
     * 
     * @param {*} selectData used to get data needed for giving id's and labels to the created selects
     * @param {*} teaData used to get data needed for creating options iniside the selects
     */
    constructor(selectData, teaData){
        this.navigation = document.getElementById('nav');
        this.image = document.getElementById('order-img');
        this.selectData = selectData;
        this.teaData = teaData;
        this.selects = document.getElementById('selects-div');
        this.textArea = document.querySelector('#local-storage-output > textarea');
        this.createSelect();
        this.teaSelect = document.getElementById('teaType');
        this.flavorSelect = document.getElementById('teaFlavor');
        this.messageSelect = document.getElementById('teaMessage');
        this.populateFirst();
        this.allSelects = document.querySelectorAll('#selects-div > select');
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.number = document.getElementById('number');
        this.button = document.getElementById('order-btn');
        this.initMap();
        this.userName = document.getElementById('user-name');
        this.validateError = document.getElementById('validateError');
    }

    //Method used for changing navbar (it is caled in the controller)
    changeNavbar(){
        if(document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            this.navigation.classList.add("bg-dark");
            this.navigation.classList.remove("bg-transparent");
        } 
        else{
            this.navigation.classList.add("bg-transparent");
            this.navigation.classList.remove("bg-dark");
        }
    }

    //Method for creating selects (it is called in the constructor of this class)
    createSelect(){
        for(let teaId in this.selectData){
            let select = document.createElement('select');
            select.setAttribute('id', teaId);
            select.setAttribute('class', 'form-select mt-5');
            select.options.add(new Option(this.selectData[teaId], teaId));
            this.selects.appendChild(select);
        }
    }

    //Method for cadding options to the first select (it is called in the constructor of this class)
    populateFirst(){
        for(let tea in this.teaData){
            this.teaSelect.options.add(new Option(tea));
        }
    }

    /**
     * Method for adding options to the second select (it is called in the controller)
     * 
     * @param {*} firstSelect is used to get the previous selects value
     * @param {*} secondSelect is used so that options can be added to it
     * @param {*} data is used to fetch the data to put inside the options
     */
    createOption(firstSelect, secondSelect, data){
        for(let tea in data[firstSelect.value]){
            secondSelect.options.add(new Option(tea));
        }
    }

    /**
     * Method for adding options to the third and last select (it is called in the controller)
     * 
     * @param {*} firstSelect is used to get the previous selects value
     * @param {*} secondSelect is used so that optionss can be added to it
     * @param {*} data is used to fetch the data to put inside the options
     */
    createMessageOption(firstSelect, secondSelect, data){
        for(let tea in data[firstSelect.previousElementSibling.value][firstSelect.value]){
            secondSelect.options.add(new Option(tea));
        }
    }

    /**
     * Method for changing the image depending on the selected option in the select
     * It also checks if the default option is selected, and if it is it will show the blank image or in the case
     * of the second and third select, it will hsow the image of the previous selects value
     * 
     * @param {*} select is used to fetch the value of the select that is being clicked
     */    
    changeImage(select){
        if(select.value === 'teaType'){
            this.image.src = 'images/blank_image.png';
        }
        else if(select.value === 'teaFlavor' || select.value === 'teaMessage'){
            this.image.src = `images/${select.previousElementSibling.value}.png`;
        }
        else{
            this.image.src = `images/${select.value}.png`;
        }
    }

    /**
     * Method used for resetting the length of the inputted select to 1 so that it doesn't have the created options (it is called in the controller)
     * 
     * @param {*} someSelect is used to get the select that needs to be reseted
     */
    resetSelectLength(someSelect){
        someSelect.length = 1;
    }

    /**
     * Method needed to create the error message when the inputs in the form are not correctly inputted (it is called in the controller)
     * 
     * @param {*} input is needed to grab the input in order to get the id and the name for the message to show where the error is
     */
    validationMessage(input){
        if(input.type === 'text'){
            document.getElementById(`validationError-${input.id}`).innerHTML = `The field for ${input.name} was left empty! Please input something in the above field.`;
        }
        else{
            document.getElementById(`validationError-${input.id}`).innerHTML = `The ${input.name} field has an incorrect value. Please input a number with 10 number digits (Ex. 0994567890)`;
        }
    }

    /**
     * Method needed to remove the error message that was previously created (it is called in the controller)
     * 
     * @param {*} input is needed to grab the input in order to get the id so that the error message can be removed
     */
    removeValMessage(input){
        document.getElementById(`validationError-${input.id}`).innerHTML = "";
    }

    /**
     * Method used for intitializing the map on the webpage (it is called in the constructor of this class) 
     * Inside it is also code needed to showcase a button which will pan to the current user's location and 
     * therefore show how far they rae from the marker a.k.a. tea shop
     * 
     * (The idea for the following code was found in the Google Maps API library: https://developers.google.com/maps/documentation/javascript/geolocation#maps_map_geolocation-javascript)
     */
    initMap(){
        //Setting where the map will start from
        let map = new google.maps.Map(document.getElementById("map"), {
            center: {lat: 45.749584, lng: 15.994539},
            zoom: 15
        });

        //Setting marker on the map which indicates the location of the tea shop
        let marker = new google.maps.Marker({
            position: {lat: 45.749584, lng: 15.994539},
            map: map
        });

        //Creating info bubble that will show where the user is located and a message to go with it
        let infoBubble = new google.maps.InfoWindow();
        //Created a button that will be used to get to the users current location
        const buttonForLoc = document.createElement("button");
        //Message that will show in the text bubble
        buttonForLoc.textContent = "Click to see how far from the store you are!";
        buttonForLoc.classList.add("custom-map-control-button");
        //Changing the look of the button
        buttonForLoc.setAttribute('class', 'locationButton');
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(buttonForLoc);
        //Adding a click event listener to the button to make the map go to the current users location 
        buttonForLoc.addEventListener("click", event => {
            //If there is geolocation then the following code will execute
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        //Setting positions for the users location
                        const userPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
                        infoBubble.setPosition(userPosition);
                        infoBubble.setContent("Found you!");
                        infoBubble.open(map);
                        map.setCenter(userPosition);
                    }, event => {
                    handleLocationError(true, infoBubble, map.getCenter());
                    }
                );
            } 
            //If there is no geolocation, the following code executed
            else {
            //This will showcase that the browser does not support geolocation
            handleLocationError(false, infoBubble, map.getCenter());
            }
        });
    }

    /**
     * Method used to handle location error that can show if the browser does not have geolocation a.k.a. the user blocked
     * using their location or the browser doesn't support geolocation
     * 
     * @param {*} browserHasGeolocation is used to chekc if the browser has geolocation (true/false)
     * @param {*} infoBubble is used to make the info bubble go to the position that is indicated in the parameter
     * @param {*} position is the position with which the info bubble's position is set
     */
    handleLocationError(browserHasGeolocation, infoBubble, position) {
        //Setting the position of the info bubble 
        infoBubble.setPosition(position);
        //Setting content of the info bubble if the browser doesn't have or doesn't support geolocation
        infoBubble.setContent(
            browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoBubble.open(map);
    }

    /**
     * Method needed to initialize the modal that will be shown ONLY when all the inputs and selects have been correctly inputted and
     * there is no validation error message (it is called in the controller) (it uses bootstrap jQuery)
     */
    initModal(){
        $("#modal").modal("toggle");
    }

    /**
     * Method used for adding the first and last name to the modal after the form is submited to the local storage
     * 
     * @param {*} firstName is used to get the first name from the form
     * @param {*} lastName is used to get the last name from the form
     */
    addNameInfo(firstName, lastName){
        this.userName.innerHTML = `${firstName} ${lastName}!`;
    }

    //Method for showing validation error message which is shown if the selects have not been chosen or the default option (label) has been chose by accident
    validateSelect(){
        this.validateError.innerHTML = 'Information about the order is invalid or it has not been selected yet. Please select the order again.';
    }

    //Method used to remove the validation error message for selects if everything is fine
    removeValidationSelect(){
        this.validateError.innerHTML = "";
    }

    resetForm(input){
        input.value = "";
    }
}