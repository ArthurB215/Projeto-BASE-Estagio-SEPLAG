import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  isEditingPessoais = false;
  isEditingTrabalhistas = false;
  mostrarModalSenha = false;
  modalSucesso = false;
  modalProcessando = false;
  emailRecuperacao: string = "";

  constructor(private router: Router) { }

  goNewPassPage() {
    this.router.navigate(['redefinir']);
  }

  startEdit(section: 'pessoais' | 'trabalhistas') {
    if (section === 'pessoais') this.isEditingPessoais = true;
    if (section === 'trabalhistas') this.isEditingTrabalhistas = true;
  }

  confirmEdit(section: 'pessoais' | 'trabalhistas') {
    if (section === 'pessoais') this.isEditingPessoais = false;
    if (section === 'trabalhistas') this.isEditingTrabalhistas = false;
    // aqui você pode salvar no backend depois
  }

  cancelEdit(section: 'pessoais' | 'trabalhistas') {
    if (section === 'pessoais') this.isEditingPessoais = false;
    if (section === 'trabalhistas') this.isEditingTrabalhistas = false;
    // aqui você pode resetar os valores se precisar
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

          setTimeout(() => {
            this.fecharModalSenha();
          }, 3000);

        }, 1000);
      }
    }
  }
