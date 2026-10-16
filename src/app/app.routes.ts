import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemon-list',
    loadComponent: () =>
      import('./view/pages/pokemon-list/pokemon-list.component').then(m => m.PokemonListComponent),
  },
  {
    path: 'pokemon',
    loadComponent: () =>
      import('./view/pages/pokemon-detail/pokemon-detail.component').then(m => m.PokemonDetailComponent),
  },
  {
    path: 'pokemon-fav',
    loadComponent: () =>
      import('./view/pages/pokemon-favorite/pokemon-favorite.component').then(m => m.PokemonFavoriteComponent),
  },
  {
    path: '**',
    redirectTo: 'pokemon-list',
  }
];
