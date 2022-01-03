import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';

import jwtDecode from 'jwt-decode'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mostrarAlerta: boolean = false
  formLogin: FormGroup

  @ViewChild("botonCerrarModal") botonCerrarModal!: ElementRef;

  constructor(private authService: AuthService) {
    this.formLogin = new FormGroup({
      email: new FormControl('aaa@gmail.com'),
      password: new FormControl('1234')
    })
  }

  ngOnInit(): void {

  }

  ocultarAlerta() {
    this.mostrarAlerta = false
  }

  login(): void {
    const datosLogin = this.formLogin.value
    this.authService.login(datosLogin)
      .subscribe({
        next: (datos: any) => {
          const token = datos.token
          this.authService.setToken(token)
          try{
            // Reconvertimos el token para sacar los datos
            const payload = jwtDecode(token)
            console.log(payload)
            this.authService.isLoggedInEvent$.emit(true)
            this.botonCerrarModal.nativeElement.click()
            this.formLogin.reset()
          }catch(err){
            console.log(err)
            this.mostrarAlerta = true
          }
        },
        error: (err) => {
          console.log(err)
          this.mostrarAlerta = true
        }
      })
  }


}