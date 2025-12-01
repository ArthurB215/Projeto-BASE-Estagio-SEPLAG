import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-adduserpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adduserpage.html',
  styleUrls: ['./adduserpage.css']
})
export class Adduserpage implements OnInit {

  // --- Controle dos submenus ---
  isUsuariosSubmenuVisible = false;
  isGruposSubmenuVisible = false;

  // --- Controle de criação ---
  mostrarConfirmacao = false;
  mostrarSucesso = false;
  formDisabled = false;

  // --- Controle do modal ---
  mostrarModalSenha = false;
  modalSucesso = false;
  modalProcessando = false;
  emailRecuperacao: string = "";

  // --- Campos do formulário ---
  nome: string = '';
  email: string = '';
  novaSenha: string = '';
  senhaConfirmar: string = '';
  cpf: string = '';
  masp: string = '';
  grupo_id: string = ''; // valor selecionado no select
  grupos: { id: number; nome: string }[] = [];

  senhaInvalida: boolean = false;
  grupoInvalido: boolean = false;
  cpfInvalido: boolean = false;
  emailInvalido: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.carregarGrupos();
  }

  // --- Carregar grupos da API ---
  carregarGrupos(): void {
    this.authService.getGrupos().subscribe({
      next: (res: any) => {
        this.grupos = res;
      },
      error: (err) => {
      }
    });
  }

  // --- Controle dos submenus ---
  toggleUsuariosSubmenu(): void {
    this.isUsuariosSubmenuVisible = !this.isUsuariosSubmenuVisible;
    if (this.isUsuariosSubmenuVisible) this.isGruposSubmenuVisible = false;
  }

  toggleGruposSubmenu(): void {
    this.isGruposSubmenuVisible = !this.isGruposSubmenuVisible;
    if (this.isGruposSubmenuVisible) this.isUsuariosSubmenuVisible = false;
  }

  // --- Navegação ---
  goAcesspage() { this.router.navigate(['acessos']); }
  goEditUserPage() { this.router.navigate(['editaruser']); }
  goDeleteUser() { this.router.navigate(['deletaruser']); }
  goAddGroupPage() { this.router.navigate(['adicionargrupo']); }
  goEditGroupPage() { this.router.navigate(['editargrupo']); }
  goNewPassPage() { this.router.navigate(['redefinir']); }
  goLogsPage() { this.router.navigate(['logs']); }
  goDeleteGroupPage() { this.router.navigate(['deletargrupo']); }

  // --- Validação ---
  emailValido(): boolean {
    return this.email.includes('@') && this.email.includes('.');
  }

  validarEmail(): void {
  this.emailInvalido = !this.emailValido();
  }

  validarSenha(): void {
    this.senhaInvalida = !(this.novaSenha && this.novaSenha.length >= 6);
  }

  validarGrupo(): void {
    this.grupoInvalido = this.grupo_id === '';
  }

  validarCpf(): void {
    this.cpfInvalido = !(this.cpf && this.cpf.length === 11);
  }

  formatarCpf(): void {
    if (this.cpf) {
      this.cpf = this.cpf.replace(/\D/g, ''); // remove tudo que não é número
    }
  }

  formValido(): boolean {
    return (
      this.nome.trim() !== '' &&
      this.emailValido() &&
      this.novaSenha.trim() !== '' &&
      this.novaSenha.length >= 6 &&
      this.senhaConfirmar.trim() !== '' &&
      this.cpf.trim() !== '' &&
      this.cpf.length === 11 &&
      this.masp.trim() !== '' &&
      this.grupo_id !== ''
    );
  }

  // --- Criação do usuário ---
  criarUsuario(): void {
    if (this.formValido() && !this.formDisabled) {
      this.mostrarConfirmacao = true;
    }
  }

  confirmarCriacao(): void {
    this.mostrarConfirmacao = false;
    this.mostrarSucesso = true;
    this.formDisabled = true;

    // ✅ Enviar apenas email, password e tipo_id
    const payload = {
      email: this.email,
      password: this.novaSenha,
      tipo_id: Number(this.grupo_id)
    };

    console.log('📤 Enviando payload:', payload);

    this.authService.criarUsuario(payload).subscribe({
      next: (res) => {
        console.log('✅ Usuário criado com sucesso:', res);
      },
      error: (err) => {
        console.error('❌ Erro ao enviar payload:', err);
      }
    });

    setTimeout(() => {
      this.mostrarSucesso = false;
      this.router.navigate(['/admin']);
    }, 2000);
  }

  cancelarCriacao(): void {
    this.mostrarConfirmacao = false;
  }

  // --- Modal de redefinição de senha ---
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
