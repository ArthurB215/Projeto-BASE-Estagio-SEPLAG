import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acesspage',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './accesspage.html',
  styleUrls: ['./accesspage.css']
})
export class Accesspage {
  isUsuariosSubmenuVisible = false;
  isGruposSubmenuVisible = false;
  mostrarPopup = false;
  formDisabled = false;
  mostrarModalSenha = false;
  modalSucesso = false;
  modalProcessando = false;
  emailRecuperacao: string = "";

  // valores dos selects
  usuario: string = '';
  grupo: string = '';
  sistema: string = '';
  solucao: string = '';
  senha: string = '';

  // opções de teste
  usuarios = ['Lucas', 'Maria', 'João'];
  grupos = ['Admin', 'Editor', 'Viewer'];
  sistemas = ['ERP', 'CRM', 'Financeiro'];
  solucoes = ['Módulo A', 'Módulo B', 'Módulo C'];

  constructor(private router: Router) { }

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

  goAddUserPage() {
    this.router.navigate(['adicionaruser']);
  }
  goEditUserPage() {
    this.router.navigate(['editaruser']);
  }
  goDeleteUser() {
    this.router.navigate(['deletaruser']);
  }
  goAddGroupPage() {
    this.router.navigate(['adicionargrupo']);
  }
  goEditGroupPage() {
    this.router.navigate(['editargrupo']);
  }
  goNewPassPage() {
    this.router.navigate(['redefinir']);
  }
  goLogsPage() {
    this.router.navigate(['logs']);
  }
  goDeleteGroupPage() { [this.router.navigate(['deletargrupo'])] }

  // validação do formulário
  formValido(): boolean {
    return this.usuario !== '' &&
      this.grupo !== '' &&
      this.sistema !== '' &&
      this.solucao !== '' &&
      this.senha.trim() !== '';
  }

  confirmar() {
    if (this.formValido()) {
      this.mostrarPopup = true;
      this.formDisabled = true; // <<< DESABILITA TUDO

      setTimeout(() => {
        this.mostrarPopup = false;
        this.router.navigate(['admin']);
      }, 2000);
    }
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
