import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoaderComponent } from '../../components/loader/loader.component';
import { IPokemon } from '../../../models/interfaces/IPokeApi.interface';
import { ApiService } from '../../../services/repository/api.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  urlDefaultImg = '../../../../assets/img/who_is_that_pokemon.jpg';

  loading = signal(true);
  pokemonData: IPokemon = {
    abilities: [],
    order: 0,
    base_experience: 0,
    height: 0,
    id: 0,
    name: '',
    types: [],
  };

  constructor(
    private readonly _router: Router,
    private readonly _ApiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getPokemonData();
  }

  getPokemonData(): void {
    const pokeUrl = sessionStorage.getItem('currentPokemon') || '';
    if (!pokeUrl) {
      this._router.navigateByUrl(`pokemon-list`);
    }
    this._ApiService.getGeneric<IPokemon>(pokeUrl).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.pokemonData = data;
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
