/**
 * Javascript file in which all the other js files are being connected and the MVC model is finally being initialized
 */

import{selectData} from './model/selectData.js';
import{teaData} from './model/teaData.js';
import{TeaModel} from './model/TeaModel.js';
import{TeaView} from './view/TeaView.js';
import{TeaController} from './controller/TeaController.js';

//The controller is being initialized and therefore the event listeners will be executed
window.onload = function(){
    new TeaController(new TeaModel(), new TeaView(selectData, teaData));
}