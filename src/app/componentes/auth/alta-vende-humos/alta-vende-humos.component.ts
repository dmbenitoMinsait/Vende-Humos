import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-alta-vende-humos',
  templateUrl: './alta-vende-humos.component.html',
  styleUrls: ['./alta-vende-humos.component.scss']
})
export class AltaVendeHumosComponent implements OnInit {

  formularioAltaVendeHumos: FormGroup
  mostrarAlerta: boolean = false

  @ViewChild ("botonCerrarModal") botonCerrarModal!: ElementRef;

  get erroresNombre(): ValidationErrors | null{
    return this.formularioAltaVendeHumos.controls['username'].errors
  }

  get erroresDescripcion(): ValidationErrors | null{
    return this.formularioAltaVendeHumos.controls['email'].errors
  }

  get erroresCategorias(): ValidationErrors | null{
    return this.formularioAltaVendeHumos.controls['password'].errors
  }

  get erroresURLImagen(): ValidationErrors | null{
    return this.formularioAltaVendeHumos.controls['urlImagen'].errors
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    // const urlEjemplo = 'https://i1.sndcdn.com/artworks-OWyyG93NAgaeGoJe-VK9Gog-t500x500.jpg'

    this.formularioAltaVendeHumos = this.formBuilder.group({
      nombre: formBuilder.control('', Validators.required), //TODO tenemos que comprobar que el vende humos no está repetido
      descripcion: formBuilder.control('', Validators.required),
      categorias: formBuilder.control('', Validators.required),
      urlImagen: formBuilder.control('', Validators.pattern(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)),
    },
    {

    })
   }

  ngOnInit(): void {
  }

  getPintaErrores(campo: string){
    return this.formularioAltaVendeHumos.controls[campo].invalid && this.formularioAltaVendeHumos.controls[campo].dirty
  }

  darAlta(){
    if (this.formularioAltaVendeHumos.invalid){
      this.mostrarAlerta = true
    }else{
      this.cerrarModal()
    }
  }
  
  cerrarModal(){
    this.botonCerrarModal.nativeElement.click()
  }

  ocultarAlerta(){
    this.mostrarAlerta = false
  }

}
