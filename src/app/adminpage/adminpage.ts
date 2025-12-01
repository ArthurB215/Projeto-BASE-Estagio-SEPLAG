import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminpage.html',
  styleUrls: ['./adminpage.css']
})

export class Adminpage {
  isUsuariosSubmenuVisible = false;
  isGruposSubmenuVisible = false;
  isEditingPessoais = false;
  isEditingTrabalhistas = false;
  mostrarModalSenha = false;
  modalSucesso = false;
  modalProcessando = false;
  emailRecuperacao: string = "";

  constructor(private router: Router) { }

  toggleUsuariosSubmenu(): void {
    this.isUsuariosSubmenuVisible = !this.isUsuariosSubmenuVisible;
    if (this.isUsuariosSubmenuVisible) {
      this.isGruposSubmenuVisible = false; // fecha o outro submenu
    }
  }

  toggleGruposSubmenu(): void {
    this.isGruposSubmenuVisible = !this.isGruposSubmenuVisible;
    if (this.isGruposSubmenuVisible) {
      this.isUsuariosSubmenuVisible = false; // fecha o outro submenu
    }
  }

  goAcesspage() {
    this.router.navigate(['acessos']);
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

  startEdit(section: 'pessoais' | 'trabalhistas') {
    if (section === 'pessoais') this.isEditingPessoais = true;
    if (section === 'trabalhistas') this.isEditingTrabalhistas = true;
  }

  confirmEdit(section: 'pessoais' | 'trabalhistas') {
    if (section === 'pessoais') this.isEditingPessoais = false;
    if (section === 'trabalhistas') this.isEditingTrabalhistas = false;
  }

  cancelEdit(section: 'pessoais' | 'trabalhistas') {
    if (section === 'pessoais') this.isEditingPessoais = false;
    if (section === 'trabalhistas') this.isEditingTrabalhistas = false;
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

