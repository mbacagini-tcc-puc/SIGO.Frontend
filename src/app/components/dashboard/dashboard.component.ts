import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeSidebarMenu() {
    document.getElementById('sidebarMenu').classList.remove('show');
  }

  possuiPermissao(modulo: string): boolean {
    return localStorage.getItem("modulos").includes(modulo);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("modulo");
    this.router.navigate(['login']);
  }

}
