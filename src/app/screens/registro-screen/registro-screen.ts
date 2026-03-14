import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios-service';

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

   /* Confirmar Password */
  public hide_2 = true;
  public inputType_2: 'password' | 'text' = 'password';

  /* Edades */
  public edades: Array<{ value: number }> = [];

  /* Grados de estudio */
  public gradosEstudio: string[] = [
    'Preparatoria',
    'Licenciatura',
    'Maestría',
    'Doctorado'
  ];

  /* Estados de la República Mexicana */
  public estadosMX: string[] = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
    'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
    'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
    'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
    'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
    'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán',
    'Zacatecas'
  ];

  constructor(
    private readonly router: Router,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    // Initialization logic here
    //Vincular el esquema de usuario del servicio para inicializar el objeto user con las propiedades necesarias para el formulario de registro.
    // Esto asegura que el objeto user tenga la estructura correcta y facilita la validación posterior.
    this.user = this.usuariosService.esquemaUser();

    // Se inia el array de edades para el select del formulario de registro.
    this.llenarArrayEdades();
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
    if (this.isLoading) return;

    // 1) Validación centralizada en UsuariosService
    this.errors = this.usuariosService.validarUsuario(this.user);

    // 2) Sin jQuery: si hay errores, se detiene
    if (Object.keys(this.errors).length > 0) return;

    // 3) Registro
    this.isLoading = true;

    //TODO: Aquí se llamaría al método de registro del servicio, pasando el objeto user.
    //TODO: Luego, se manejaría la respuesta (éxito o error) para mostrar mensajes al usuario o navegar a otra pantalla.

  }

  public goLogin(): void {
    this.router.navigate(['']); // ajuste según su app
  }

  public showPassword(): void {
    this.hide_1 = !this.hide_1;
    this.inputType_1 = this.hide_1 ? 'password' : 'text';
  }

  public showConfirmPassword(): void {
    this.hide_2 = !this.hide_2;
    this.inputType_2 = this.hide_2 ? 'password' : 'text';
  }

   /** Solo letras y espacios */
  public soloTexto(event: KeyboardEvent): boolean {
    const char = event.key;
    if (char.length > 1) return true;
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]$/.test(char);
  }

  /** Solo alfanumérico sin espacios */
  public soloAlfanumerico(event: KeyboardEvent): boolean {
    const char = event.key;
    if (char.length > 1) return true;
    return /^[a-zA-Z0-9]$/.test(char);
  }

  /** Texto para dirección: letras, números, espacios, comas, puntos, # y guiones */
  public textoDireccion(event: KeyboardEvent): boolean {
    const char = event.key;
    if (char.length > 1) return true;
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.,#\-]$/.test(char);
  }

  /** Convierte a mayúsculas en tiempo real (CURP y RFC) */
  public toUpperCase(field: string): void {
    if (this.user[field]) {
      this.user[field] = this.user[field].toUpperCase();
    }
  }
}


