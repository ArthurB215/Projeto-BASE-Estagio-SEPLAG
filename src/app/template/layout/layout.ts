import { Component, HostListener  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationStart } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  mostrarUserMenu = false;

  constructor(private router: Router, private authService: AuthService) {
    // 🔹 Observa toda mudança de rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // 🔹 Se o usuário for para a página de login manualmente
        if (event.url === '/' || event.url === '/login') {
          this.authService.logout(); // 🔹 limpa cookie e localStorage
        }
      }
    });
  }

  toggleUserMenu() {
    this.mostrarUserMenu = !this.mostrarUserMenu;
  }

   @HostListener('document:click', ['$event'])
  clickFora(event: Event) {
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.user-menu');
    const botao = document.querySelector('.btn-person'); // botão que abre o menu

    if (this.mostrarUserMenu && menu && !menu.contains(target) && botao && !botao.contains(target)) {
      this.mostrarUserMenu = false;
    }
  }


  goProfile() { this.router.navigate(['/perfil']); }
  goadmin() { this.router.navigate(['/admin']); }
  gohome() { this.router.navigate(['/home']); }

  Logout() {
    this.authService.logout(); // 🔹 apaga cookie e localStorage
    this.router.navigate(['/']); // 🔹 volta para login
  }

  fecharOutros(event: Event) {
    const aberto = event.target as HTMLDetailsElement;
    if (aberto.open) {
      const todos = document.querySelectorAll('.sidebar-list details');
      todos.forEach((det) => { if (det !== aberto) det.removeAttribute('open'); });
    }
  }
}
