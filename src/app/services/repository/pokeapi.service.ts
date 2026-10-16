import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { IGetAllPokemon, IPokemon } from '../../models/interfaces/IPokeApi.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private readonly urlPokeBase: string = environment.urlBasePokeapi;

  constructor(
    private _apiService: ApiService
  ) { }

  getPokemonAll(offset: number = 0, limit: number = 20): Observable<IGetAllPokemon> {
    return this._apiService.getGeneric<IGetAllPokemon>(`${this.urlPokeBase}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonById(id: number): Observable<IPokemon> {
    return this._apiService.getGeneric<IPokemon>(`${this.urlPokeBase}/pokemon/${id}`).pipe(
      map(data => ({ ...data, consultedAt: new Date() }))
    )
  }

  async getPokemonFavorite(showSuccessMessage?: () => void): Promise<IPokemon> {
    try {
      const response = await firstValueFrom(this._apiService.getGeneric<IPokemon>(`${this.urlPokeBase}/pokemon/94`).pipe(
        tap(() => {
          if (showSuccessMessage) {
            showSuccessMessage();
          }
        })
      ));
      return response;
    } catch (error: any) {
      throw new Error(`Ha ocurrido un error: ${error?.message || 'Error desconocido'}`);
    }
  }
}
