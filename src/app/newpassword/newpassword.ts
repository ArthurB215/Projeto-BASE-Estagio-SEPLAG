import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newpassword.html',
  styleUrls: ['./newpassword.css']
})
export class Newpassword {
  mostrarPopup = false;
  formDisabled = false;
  showSenha1: boolean = false;
  showSenha2: boolean = false;

  senha1: string = '';
  senha2: string = '';

  constructor(private router: Router) {}

  // ✅ Regras individuais
  get tem8caracteres(): boolean {
    return this.senha1.length >= 8;
  }

  get temMaiusculaMinuscula(): boolean {
    return /[A-Z]/.test(this.senha1) && /[a-z]/.test(this.senha1);
  }

  get temNumeroEspecial(): boolean {
    return /\d/.test(this.senha1) && /[!@#$%^&*(),.?":{}|<>]/.test(this.senha1);
  }

  get senhasIguais(): boolean {
    return this.senha1.length > 0 && this.senha1 === this.senha2;
  }

  // ✅ Form válido só se todas as regras + confirmação estiverem ok
  formValido(): boolean {
    return (
      this.tem8caracteres &&
      this.temMaiusculaMinuscula &&
      this.temNumeroEspecial &&
      this.senhasIguais
    );
  }

  confirmar() {
    if (this.formValido()) {
      this.mostrarPopup = true;
      this.formDisabled = true;

      setTimeout(() => {
        this.mostrarPopup = false;
        this.router.navigate(['/perfil']);
      }, 2000);
    }
  }
}
