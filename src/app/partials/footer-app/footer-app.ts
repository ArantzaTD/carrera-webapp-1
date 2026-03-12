import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-app',
  imports: [],
  templateUrl: './footer-app.html',
  styleUrl: './footer-app.scss',
})
export class FooterApp implements OnInit {

  /* =========================================================
     CONFIGURACIÓN VISUAL
     ========================================================= */

  @Input() showLicensed = false;
  @Input() year: number = new Date().getFullYear();

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit(): void {
  }

  /* =========================================================
     NAVEGACIÓN DIRECTA
     ========================================================= */

  /** Navega a Política de Privacidad */
  public onPrivacy(): void {
    this.router.navigate(['app','politica-privacidad']);
  }

  /** Navega a Términos y Condiciones */
  public onTerms(): void {
    this.router.navigate(['app','terminos-condiciones']);
  }

}
