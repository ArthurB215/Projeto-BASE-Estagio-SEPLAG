import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-deleteuserpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deleteuserpage.html',
  styleUrls: ['./deleteuserpage.css']
})
export class Deleteuserpage {

  usuarios = [
    { nome: "Arthur Batista", email: "arthur@mg.gov.br", cpf: "123.456.789-00", masp: "1234567-0", ativo: true },
    { nome: "Lucas Nascimento", email: "lucas@mg.gov.br", cpf: "987.654.321-00", masp: "7654321-0", ativo: false },
    { nome: "Michael Henrique", email: "michael@mg.gov.br", cpf: "999.999.999-00", masp: "9999999-0", ativo: true }
  ];

  isUsuariosSubmenuVisible = false;
  isGruposSubmenuVisible = false;

  // controle dos popups
  mostrarConfirmacao = false;
  mostrarSucesso = false;

  // bloqueio do formulário após confirmar
  formDisabled = false;
  mostrarModalSenha = false;
  modalSucesso = false;
  modalProcessando = false;
  emailRecuperacao: string = "";

  usuarioSelecionado: string = "";
  emailSelecionado: string = "";
  cpfSelecionado: string = "";
  maspSelecionado: string = "";
  usuarioAtivo: boolean = true;
  senhaConfirmacao: string = "";
  alterarSenha: boolean = false;

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


  // navegações
  goAcesspage() { this.router.navigate(['acessos']); }
  goEditUserPage() { this.router.navigate(['editaruser']); }
  goAddUserPage() { this.router.navigate(['adicionaruser']); }
  goAddGroupPage() { this.router.navigate(['adicionargrupo']); }
  goEditGroupPage() { this.router.navigate(['editargrupo']); }
  goNewPassPage() { this.router.navigate(['redefinir']); }
  goLogsPage() { this.router.navigate(['logs']); }
  goDeleteGroupPage() { [this.router.navigate(['deletargrupo'])] }


  formValido(): boolean {
    return this.senhaConfirmacao.trim() !== '';
  }

  abrirConfirmacao(): void {
    if (this.formValido() && !this.formDisabled) {
      this.mostrarConfirmacao = true;
    }
  }

  carregarDados() {
    const user = this.usuarios.find(u => u.nome === this.usuarioSelecionado);
    if (user) {
      this.emailSelecionado = user.email;
      this.cpfSelecionado = user.cpf;
      this.maspSelecionado = user.masp;
      this.usuarioAtivo = user.ativo;
    }
  }

  salvarAlteracoes() {
    console.log("Usuário atualizado:", {
      usuario: this.usuarioSelecionado,
      email: this.emailSelecionado,
      cpf: this.cpfSelecionado,
      masp: this.maspSelecionado,
      ativo: this.usuarioAtivo,
      alterarSenha: this.alterarSenha,
      senhaConfirmacao: this.senhaConfirmacao
    });
  }

  confirmarCriacao(): void {
    this.mostrarConfirmacao = false;
    this.mostrarSucesso = true;

    this.formDisabled = true;

    console.log("Usuário deletado:", {
      usuario: this.usuarioSelecionado,
      email: this.emailSelecionado,
      cpf: this.cpfSelecionado,
      masp: this.maspSelecionado,
      ativo: this.usuarioAtivo
    });

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
