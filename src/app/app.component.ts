import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  listaVendehumos: any = [{
    id: 1,
    nombre: 'Josheff Ajram',
    descripcion: '',
    categorias: ['Trading'],
    fechaAlta: new Date(2020, 2, 13),
    urlImagen: 'https://www.lavanguardia.com/files/image_449_220/uploads/2016/10/23/5fa2fa5435882.jpeg',
    votadoPor: [1, 2, 3], //son los identificadores de los usuarios
    usuarioId: 1
    
  },
  {
    id: 2,
    nombre: 'Roberto Gamboa',
    descripcion: 'https://pbs.twimg.com/media/EhKkbyrXsAEZC8L.jpg',
    categorias: ['No se'],
    fechaAlta: new Date(2020, 2, 13),
    urlImagen: '',
    votadoPor: [1, 2, 3],
    usuarioId: 2
  },
  {
    id: 3,
    nombre: 'Willyrex',
    descripcion: '',
    categorias: ['NFTs'],
    fechaAlta: new Date(2020, 2, 13),
    urlImagen: 'https://i1.sndcdn.com/artworks-OWyyG93NAgaeGoJe-VK9Gog-t500x500.jpg',
    votadoPor: [1, 2, 3],
    usuarioId: 3
  }
]
}


// class Vendehumo {
//   constructor(public id: number){

//   }
// }
