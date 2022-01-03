import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {

  isLikePulsado: boolean = false

  constructor() { }

  ngOnInit(): void {
    // TODO tendríamos que recoger todos los vendehumos que hay y además añadir el ngzone para la librería socket este a atenta de cuando haya un push de vendehumos
  }

  botonLike(){
    this.isLikePulsado = !this.isLikePulsado // si el usuario ya le ha dado like, el botón debería de aparecer ya como pulsado

    // TODO tenemos que añadir que el usuario le ha dado like (en la base de datos habría que hacer las comprobaciones de si el usuario le ha dado like)
  }

}
