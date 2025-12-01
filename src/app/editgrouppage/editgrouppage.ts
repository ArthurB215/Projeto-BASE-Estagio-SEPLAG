import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editgrouppage',
  imports: [CommonModule, FormsModule],
  templateUrl: './editgrouppage.html',
  styleUrl: './editgrouppage.css'
})
export class Editgrouppage {

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

  grupos = [
    {
      id: 1,
      nome: 'Admin',
      acessos: ['FiscWeb', 'Radar Patrimonio', 'PortalCA'],
      permissoes: ['Adicionar Usuário', 'Remover Grupo', 'Editar Usuário']
    },
    {
      id: 2,
      nome: 'Usuário Padrão',
      acessos: ['Ratear+', 'Teste'],
      permissoes: ['Adicionar Usuário']
    }
  ];

  // Variável do grupo selecionado
  grupoSelecionado: string = "";

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
  goAddUserPage() { this.router.navigate(['adicionaruser']); }
  goAddGroupPage() {this.router.navigate(['adicionargrupo']);}
  goNewPassPage() { this.router.navigate(['redefinir']); }
  goLogsPage() { this.router.navigate(['logs']); }
  goDeleteGroupPage() { [this.router.navigate(['deletargrupo'])] }

  acessosCheckbox: { [key: string]: boolean } = {};
  permissoesCheckbox: { [key: string]: boolean } = {};

  // Função chamada ao mudar dropdown
  carregarGrupo() {
  const grupo = this.grupos.find(g => g.id.toString() === this.grupoSelecionado);

  if (grupo) {
    Object.keys(this.acessosCheckbox).forEach(k => this.acessosCheckbox[k] = false);
    Object.keys(this.permissoesCheckbox).forEach(k => this.permissoesCheckbox[k] = false);

    grupo.acessos.forEach(a => this.acessosCheckbox[a] = true);
    grupo.permissoes.forEach(p => this.permissoesCheckbox[p] = true);
  }
}

  // Validação
  formValido(): boolean {
    return this.senhaConfirmacao.trim() !== '' && this.grupoSelecionado !== null;
  }

  abrirConfirmacao(): void {
    if (this.formValido() && !this.formDisabled) {
      this.mostrarConfirmacao = true;
    }
  }

  confirmarCriacao(): void {
    this.mostrarConfirmacao = false;
    this.mostrarSucesso = true;
    this.formDisabled = true;

    setTimeout(() => {
      this.mostrarSucesso = false;
      this.router.navigate(['/admin']);
    }, 2000);
  }

  cancelarCriacao(): void {
    this.mostrarConfirmacao = false;
  }

  abrirModalSenha() {
    this.mostrarModalSenha = true;
    this.modalSucesso = false;
    this.modalProcessando = false;
    this.emailRecuperacao = "";
  }

  fecharModalSenha() {
    this.mostrarModalSenha = false;
  }

  emailValidoRecuperacao(): boolean {
    return this.emailRecuperacao.includes("@") && this.emailRecuperacao.includes(".");
  }

  enviarEmailRecuperacao() {
    if (this.emailValidoRecuperacao()) {
      this.modalProcessando = true;

      setTimeout(() => {
        this.modalProcessando = false;
        this.modalSucesso = true;

        setTimeout(() => {
          this.fecharModalSenha();
        }, 3000);

      }, 1000);
    }
  }
}
