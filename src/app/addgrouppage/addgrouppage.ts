import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addgrouppage',
  imports: [CommonModule, FormsModule],
  templateUrl: './addgrouppage.html',
  styleUrl: './addgrouppage.css'
})
export class Addgrouppage {

  isUsuariosSubmenuVisible = false;
  isGruposSubmenuVisible = false;

  mostrarConfirmacao = false;
  mostrarSucesso = false;

  // bloqueio do formulário após confirmar
  formDisabled = false;
  mostrarModalSenha = false;
  modalSucesso = false;
  modalProcessando = false;
  emailRecuperacao: string = "";

  senhaConfirmacao: string = "";
  nomeGrupo: string = "";

  constructor(private router: Router) { }

  // controle dos submenus
  toggleUsuariosSubmenu(): void {
    this.isUsuariosSubmenuVisible = !this.isUsuariosSubmenuVisible;
    if (this.isUsuariosSubmenuVisible) {
      this.isGruposSubmenuVisible = false;
    }
  }

  toggleGruposSubmenu(): void {
    this.isGruposSubmenuVisible = !this.isGruposSubmenuVisible;
    if (this.isGruposSubmenuVisible) {
      this.isUsuariosSubmenuVisible = false;
    }
  }

  // navegações
  goAcesspage() { this.router.navigate(['acessos']); }
  goEditUserPage() { this.router.navigate(['editaruser']); }
  goDeleteUser() { this.router.navigate(['deletaruser']); }
  goAddUserPage() {this.router.navigate(['adicionaruser']); }
  goEditGroupPage() { this.router.navigate(['editargrupo']); }
  goNewPassPage() { this.router.navigate(['redefinir']); }
  goLogsPage() { this.router.navigate(['logs']); }
  goDeleteGroupPage() { [this.router.navigate(['deletargrupo'])] }

  formValido(): boolean {
    return this.senhaConfirmacao.trim() !== '' &&
    this.nomeGrupo.trim() !== '';
  }

  abrirConfirmacao(): void {
    if (this.formValido() && !this.formDisabled) {
      this.mostrarConfirmacao = true;
    }
  }

  confirmarCriacao(): void {
    this.mostrarConfirmacao = false;
    this.mostrarSucesso = true;

    // desabilita o formulário e o botão
    this.formDisabled = true;

    setTimeout(() => {
      this.mostrarSucesso = false;
      this.router.navigate(['/admin']);
    }, 2000);
  }

  // usuário clicou em "Cancelar" no popup de confirmação
  cancelarCriacao(): void {
    this.mostrarConfirmacao = false;
  }

  abrirModalSenha() {
    this.mostrarModalSenha = true;
    this.modalSucesso = false;
    this.modalProcessando = false;
    this.emailRecuperacao = "";
  }

  // Fecha o modal
  fecharModalSenha() {
    this.mostrarModalSenha = false;
  }

  // Valida o email
  emailValidoRecuperacao(): boolean {
    return this.emailRecuperacao.includes("@") && this.emailRecuperacao.includes(".");
  }

  // Simula o envio
  enviarEmailRecuperacao() {
    if (this.emailValidoRecuperacao()) {
      this.modalProcessando = true;

      setTimeout(() => {
        this.modalProcessando = false;
        this.modalSucesso = true;

        // Fecha o modal automaticamente depois de 1.5s
        setTimeout(() => {
          this.fecharModalSenha();
        }, 3000);

      }, 1000);
    }
  }
}
