import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly base: string = environment.urlBasePokeapi;

  constructor(
    private readonly _http: HttpClient,
  ) { }


  /**
   * Método genérico para uso de gets con parámetros
   * @template T
   * @param {string} path Ej /path
   * @param {string} param Ej ?id=20
   * @returns {Observable<T>}
   */
  getGeneric<T>(path: string, param?: string): Observable<T> {
    return this._http.get<T>(`${path}${param || ''}`).pipe(
      tap(response => {
        console.log(`Path: ${path}`, response);
        return response;
      }),
      catchError(error => {
        console.log(`Error en GET: ${path}`, error);
        return throwError(() => new Error(`Ha ocurrido un error: ${error?.message || 'Error desconocido'}`));
      })
    );
  }

  /**
 * Método genérico para uso de gets con parámetros, versión con promesas
 * @template T
 * @param {string} path
 * @param {string} param Ej ?id=20
 * @returns {Promise<T>}
 */
  async getGenericPromise<T>(path: string, param?: string): Promise<T> {
    try {
      const response = await firstValueFrom(
        this._http.get<T>(`${this.base}${path}${param || ''}`)
      );
      console.log(`Path: ${path}`, response);
      return response;
    } catch (error: any) {
      console.error(`Error en GET: ${path}`, error);
      throw new Error(`Ha ocurrido un error: ${error?.message || 'Error desconocido'}`);
    }
  }

}
