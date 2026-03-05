import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-screen.html',
  styleUrl: './registro-screen.scss',
})
export class RegistroScreen implements OnInit {

  /* =========================
     Estado
     ========================= */
  public user: any = {};
  public errors: any = {};
  public isLoading = false;

  /* Password */
  public hide_1 = true;
  public inputType_1: 'password' | 'text' = 'password';

  /* Edades */
  public edades: Array<{ value: number }> = [];

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // Initialization logic here
  }

  private llenarArrayEdades(): void {
    // Igual a su lógica original (18..80)
    this.edades = Array.from({ length: 63 }, (_, i) => ({ value: i + 18 }));
  }

  public terminosCondiciones(): void {
    // Aquí puede abrir modal / navegar / etc.
    alert('Aquí se mostrarán los Términos y Condiciones.');
  }

  public registrar(): void {
    // Lógica de registro aquí
  }

  public goLogin(): void {
    this.router.navigate(['']); // ajuste según su app
  }

  public showPassword(): void {
    this.hide_1 = !this.hide_1;
    this.inputType_1 = this.hide_1 ? 'password' : 'text';
  }

}
