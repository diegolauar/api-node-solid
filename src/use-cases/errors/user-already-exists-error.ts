export class UserAlreayExistsError extends Error { 
    constructor() {
        super('E-mail already exists. ')
    }
}