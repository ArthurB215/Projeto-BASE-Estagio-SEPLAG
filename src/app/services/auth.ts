import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = true; // sempre logado para evitar erros em outros componentes

  constructor() {}

  login(email: string, senha: string): Observable<any> {
    // Apenas retorna sucesso SEM autenticação real
    this.loggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');

    return of({ success: true });
  }

  validarToken(): Observable<boolean> {
    // Sempre retorna true
    return of(true);
  }

  isLoggedIn(): boolean {
    // Nunca bloqueia nada
    return true;
  }

  logout(): void {
    // Apenas limpa, mas não bloqueia ninguém
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  criarUsuario(data: { email: string; password: string; tipo_id: number }): Observable<any> {
    return of({ success: true });
  }

  getGrupos(): Observable<any> {
    return of([]);
  }
}
