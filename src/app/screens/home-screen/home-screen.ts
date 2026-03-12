import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

/* ===== Partials standalone ===== */
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';
import { FooterApp } from '../../partials/footer-app/footer-app';
import { Router } from '@angular/router';

/**
 * HomeScreenComponent
 * ---------------------------------------------------------
 * Pantalla principal de la aplicación.
 * Controla:
 * - Drawer (sidebar)
 * - Header / Footer
 * - Formulario reactivo (FormArray)
 * - Tabla de códigos
 */

@Component({
  selector: 'app-home-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
    FooterApp
  ],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.scss',
})
export class HomeScreen implements OnInit {

  /* =========================================================
     ESTADO GENERAL
     ========================================================= */

  /** Controla opciones del sidebar */
  public isLogin = true;

  /** Controla apertura/cierre del drawer */
  public drawerOpen = false;

  /** Controla franja Licensed del footer */
  public showLicensed = false;

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  /* =========================================================
     DRAWER (HEADER / SIDEBAR)
     ========================================================= */

  /** Evento emitido por el Header */
  public toggleSidebar(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  /** Evento emitido por el Sidebar */
  public closeSidebar(): void {
    this.drawerOpen = false;
  }

  /* =========================================================
     FOOTER
     ========================================================= */

  public openPrivacy(): void {
    this.router.navigate(['/politica-privacidad']);
  }

  public openTerms(): void {
    this.router.navigate(['/terminos-condiciones']);
  }
}
