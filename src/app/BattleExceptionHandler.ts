// Exception handling class
import { ErrorHandler } from '@angular/core'
export class BattleException extends ErrorHandler {
    constructor() {
        super(true);
    }
    handleError(exception) {
        alert(exception)
        //super.handleError(error);
    }
}