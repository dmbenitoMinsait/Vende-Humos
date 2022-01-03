import { AbstractControl, ValidationErrors } from "@angular/forms"


 function passwordRepetida(control: AbstractControl): ValidationErrors | null {
    // con el parent accederíamos al padre del control, que sería el formulario
    const formulario = control.parent
    const password = formulario?.value.password

    const confirmarPassword = control.value

    if (password == confirmarPassword) {
        return null
    }
    return {
        confirmarPassword: true
    }
}


export const CustomValidators = {
    passwordRepetida
}