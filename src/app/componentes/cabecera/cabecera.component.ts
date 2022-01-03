import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/servicios/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  isLoggedIn!: boolean
  nombre: string = 'Dani'
  urlImagen: string = 'https://i1.sndcdn.com/artworks-OWyyG93NAgaeGoJe-VK9Gog-t500x500.jpg'

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedInEvent$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn
    })
  }

  logOut(): void{
    this.authService.delToken()
    this.authService.isLoggedInEvent$.emit(false)
  }

}
