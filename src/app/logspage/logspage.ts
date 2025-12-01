import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logspage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logspage.html',
  styleUrls: ['./logspage.css']
})
export class Logspage {

  mostrarPopup = false;
  formDisabled = false;

  logs = [
    {
      data: '02/09/2025',
      hora: '11:34',
      usuario: 'admin',
      tipo: 'Login bem-sucedido',
      detalhes: 'Autenticado via navegador Chrome',
      ip: '187.45.12.101',
      acao: ''
    },
    {
      data: '10/09/2025',
      hora: '11:40',
      usuario: 'joao.silva',
      tipo: 'Tentativa de login',
      detalhes: 'Senha incorreta (3 tentativas falhas)',
      ip: '177.220.30.88',
      acao: ''
    },
    {
      data: '12/09/2025',
      hora: '14:10',
      usuario: 'admin',
      tipo: 'Exclusão de registro',
      detalhes: 'Registro ID removido',
      ip: '187.45.12.101',
      acao: ''
    },
    {
      data: '14/09/2025',
      hora: '17:25',
      usuario: 'paulo.costa',
      tipo: 'Alteração de cadastro',
      detalhes: 'Usuário atualizado',
      ip: '200.155.44.12',
      acao: ''
    }
  ];

  logsFiltrados = [...this.logs];

  tipoLog: string = '';
  dataInicio: string = '';
  horaInicio: string = '';
  dataFim: string = '';
  horaFim: string = '';

  constructor(private router: Router) { }

  private parseDataHora(data: string, hora: string): Date {
    const [dia, mes, ano] = data.split('/').map(Number);
    const [h, m] = hora ? hora.split(':').map(Number) : [0, 0];
    return new Date(ano, mes - 1, dia, h, m);
  }

  // Filtra os logs
  pesquisar() {
    this.logsFiltrados = this.logs.filter(log => {
      let ok = true;

      // Filtro por tipo
      if (this.tipoLog && !log.tipo.toLowerCase().includes(this.tipoLog.toLowerCase())) {
        ok = false;
      }

      const dataLog = this.parseDataHora(log.data, log.hora);

      if (this.dataInicio) {
        const inicio = this.parseDataHora(
          this.dataInicio.split('-').reverse().join('/'),
          this.horaInicio || '00:00'
        );
        if (dataLog < inicio) ok = false;
      }

      if (this.dataFim) {
        const fim = this.parseDataHora(
          this.dataFim.split('-').reverse().join('/'),
          this.horaFim || '23:59'
        );
        if (dataLog > fim) ok = false;
      }

      return ok;
    });
  }

  // 🔄 Limpar filtros
  limparFiltros() {
    this.tipoLog = '';
    this.dataInicio = '';
    this.horaInicio = '';
    this.dataFim = '';
    this.horaFim = '';
    this.logsFiltrados = [...this.logs];
  }

  // Mantém seu código
  formValido(): boolean {
    return (this.mostrarPopup);
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
