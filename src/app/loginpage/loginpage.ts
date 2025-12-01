import { AuthService } from './../services/auth';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './loginpage.html',
  styleUrls: ['./loginpage.css']
})
export class Loginpage {
  email: string = '';
  senha: string = '';
  emailTouched: boolean = false;
  senhaTouched: boolean = false;

  mostrarSucesso: boolean = false;
  mostrarErro: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  emailValido(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

   onSubmit(event?: Event) {
    if (event) event.preventDefault();
    if (!this.emailValido() || !this.senha) return;

    this.authService.login(this.email, this.senha).subscribe({
      next: (res: any) => {
        if (res.success) {
          // mostra popup de sucesso
          this.mostrarSucesso = true;

          // redireciona após 1,5s
          setTimeout(() => {
            this.mostrarSucesso = false;
            this.router.navigate(['/home']);
          }, 1500);
        } else {
          // mostra popup de erro
          this.mostrarErro = true;
          setTimeout(() => this.mostrarErro = false, 2000);
        }
      },
      error: () => {
        // mostra popup de erro genérico
        this.mostrarErro = true;
        setTimeout(() => this.mostrarErro = false, 2000);
      }
    });
  }
}
