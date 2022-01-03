import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { CustomValidators } from '../validators/custom-validators';

import jwtDecode from 'jwt-decode'
import { LoginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formularioRegistro: FormGroup 
  mostrarAlerta: boolean = false

  @ViewChild ("botonCerrarModal") botonCerrarModal!: ElementRef;

  get erroresUsername(): ValidationErrors | null{
    return this.formularioRegistro.controls['username'].errors
  }

  get erroresEmail(): ValidationErrors | null{
    return this.formularioRegistro.controls['email'].errors
  }

  get erroresPassword(): ValidationErrors | null{
    return this.formularioRegistro.controls['password'].errors
  }

  get erroresConfirmarPassword(): ValidationErrors | null{
    return this.formularioRegistro.controls['confirmarPassword'].errors
  }

  get erroresURLImagen(): ValidationErrors | null{
    return this.formularioRegistro.controls['urlImagen'].errors
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) {

    this.formularioRegistro = this.formBuilder.group({
      username: formBuilder.control('', [Validators.required, Validators.minLength(2)]), 
      email: formBuilder.control('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      password: formBuilder.control('', Validators.required),
      confirmarPassword: formBuilder.control('', [Validators.required, CustomValidators.passwordRepetida]),
      urlImagen: formBuilder.control('', Validators.pattern(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)),
    },
    {

    })
   }

  ngOnInit(): void {
  }

  getPintaErrores(campo: string){
    return this.formularioRegistro.controls[campo].invalid && this.formularioRegistro.controls[campo].dirty
  }

  registro(){
    if (this.formularioRegistro.invalid){
      this.mostrarAlerta = true
    }else{
        const datosRegistro = this.formularioRegistro.value
        this.authService.registro(datosRegistro)
          .subscribe({
            next: (datos: any) => {
              this.iniciarSesion(datosRegistro); // una vez que nos hemos registrado inicamos sesión
            },
            error: (err) => {
                console.log('Error en el email',err)
                this.mostrarAlerta = true
              }
          })
       
    }
    console.log(this.formularioRegistro.value)
  }

  private iniciarSesion(datosRegistro: any): void {
    const { email, password}: LoginModel = datosRegistro
    const loginModel: LoginModel = {
      email: email,
      password: password
    }
    this.authService.login(loginModel)
      .subscribe({
        next: (datos: any) => {
          const token = datos.token;
          this.authService.setToken(token);
          try {
            // Reconvertimos el token para sacar los datos
            const payload = jwtDecode(token);
            console.log(payload);
            this.authService.isLoggedInEvent$.emit(true);
            this.botonCerrarModal.nativeElement.click();
            this.formularioRegistro.reset();
          } catch (err) {
            console.log(err);
            this.mostrarAlerta = true;
          }
        },
        error: (err) => {
          console.log(err);
          this.mostrarAlerta = true;
        }
      });
  }

  ocultarAlerta(){
    this.mostrarAlerta = false
  }

}
