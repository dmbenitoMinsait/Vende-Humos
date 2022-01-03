import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { USUARIOS } from 'src/app/mock-api/usuarios_mocks';
import { LoginModel } from 'src/app/models/login.model';
import { Usuario } from 'src/app/models/usuario.model';
import { JWTData } from 'src/app/models/jwtdata.model';

import jwtDecode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedInEvent$ = new EventEmitter<boolean>()
  usuariosService: Usuario[] = USUARIOS

  private keyToken: string = 'jwt'

  constructor(private http: HttpClient) { }

  getUserIdFromToken(): number{
    const token = this.getToken()
    if (token){
      const payload: JWTData = jwtDecode(token)
      console.log({payload})
      return payload.id
    }
    return -1
  }

  getToken(): string | null {
    return localStorage.getItem(this.keyToken)
  }

  setToken(token: string): void{
    localStorage.setItem(this.keyToken, token)
    this.isLoggedInEvent$.emit(true)
  }

  delToken(): void{
    localStorage.removeItem(this.keyToken)
    this.isLoggedInEvent$.emit(false)
  }

  hasToken(): boolean{
    return this.getToken() != null
  }

  login(datosLogin: {email: string, password: string}): Observable<any>{ // Habría que sacar esto a una interfaz
    return this.http.post('http://localhost:3200/login', datosLogin)
  }

  registro(datosRegistro: Usuario){
    return this.http.post('http://localhost:3200/signup', datosRegistro)
  }
}
