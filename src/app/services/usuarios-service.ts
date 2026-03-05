import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator-service';
import { ErrorsService } from './tools/errors-service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegistroUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  telefono: string;
  ciudad: string;
  edad: number | null;
  terminos_condiciones: boolean;
}

export interface PerfilUsuarioUI {
  first_name: string;
  last_name: string;
  email: string;
  telefono: string;
  estado: string;
  ciudad: string;
  edad: number | null;

  // extras para UI
  codigo?: string;
  fecha_registro?: string; // ISO
  photoUrl?: string;
  rolEtiqueta?: string; // ej. "DOCENTE BUAP"
}

export type RegistroErrors = Partial<Record<keyof RegistroUser, string>>;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  constructor(
    private readonly http: HttpClient,
    private validadorService: ValidatorService,
    private errorsService: ErrorsService
  ) {}

  /* =========================================================
     1) ESQUEMA (modelo base)
     ========================================================= */
  public esquemaUser(): RegistroUser {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      telefono: '',
      ciudad: '',
      edad: null,
      terminos_condiciones: false
    };
  }

  /* =========================================================
     2) VALIDACIÓN (centralizada)
     ========================================================= */

  public validarUsuario(user: RegistroUser): RegistroErrors {
    const errors: RegistroErrors = {};

    if (!user.first_name?.trim()) {
      errors.first_name = 'El nombre es obligatorio.';
    }

    if (!user.last_name?.trim()) {
      errors.last_name = 'Los apellidos son obligatorios.';
    }

    if (!user.email?.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!this.validadorService.email(user.email)) {
      errors.email = 'El correo electrónico no tiene un formato válido.';
    }

    if (!user.password?.trim()) {
      errors.password = 'La contraseña es obligatoria.';
    } else if (user.password.trim().length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (!user.telefono?.trim()) {
      errors.telefono = 'El teléfono es obligatorio.';
    } else if (!this.validadorService.phoneMX(user.telefono)) {
      errors.telefono = 'El teléfono debe contener 10 dígitos.';
    }

    if (!user.ciudad?.trim()) {
      errors.ciudad = 'La ciudad es obligatoria.';
    }

    if (user.edad === null || user.edad === undefined) {
      errors.edad = 'Seleccione una edad.';
    }

    // Importante: esta validación la pide su UI
    if (!user.terminos_condiciones) {
      errors.terminos_condiciones = 'Debe aceptar los términos y condiciones.';
    }
    return errors;
  }

  /* =========================================================
     3) HTTP: REGISTRO DE USUARIO
     - Registro va aquí (no en Facade)
     - Tipado: recibe RegistroUser
     - Devuelve Observable para usar subscribe()
     ========================================================= */

  public registrarUser(user: RegistroUser): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<any>(`${environment.url_api}/users/`, user, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Ajuste fino según cómo responda su API
          const message =
            (typeof error.error === 'string' ? error.error : error.error?.message) ||
            error.message ||
            'No se pudo registrar el usuario.';

          return throwError(() => new Error(message));
        })
      );
  }

  /* =========================================================
     4) UI: PERFIL DUMMY (solo maquetación)
     ========================================================= */
  public getPerfilDummy(): PerfilUsuarioUI {
    return {
      first_name: 'Luis Yael',
      last_name: 'Méndez Sánchez',
      email: 'luis.mendezsanchez@correo.buap.mx',
      telefono: '2211908923',
      estado: 'Puebla',
      ciudad: 'Puebla',
      edad: 30,

      codigo: 'CARDUC-2026-LYMS-001',
      fecha_registro: '2026-02-09T12:00:00.000Z',
      photoUrl: 'assets/images/avatar.png',
      rolEtiqueta: 'DOCENTE BUAP',
    };
  }
}
