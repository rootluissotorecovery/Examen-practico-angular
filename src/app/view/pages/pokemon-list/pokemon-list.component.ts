import { Component, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CryptojsService } from '../../../services/helpers/cryptojs.service';
import { PokeapiService } from '../../../services/repository/pokeapi.service';
import { PaginatorComponent } from "../../components/paginator/paginator.component";
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { IPokemonShort } from '../../../models/interfaces/IPokeApi.interface';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PaginatorComponent, LoaderComponent, PokemonCardComponent],
  providers: [PokeapiService],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  private destroy$ = new Subject<void>();
  loading = signal(true);

  dataListOriginal = signal<IPokemonShort[]>([]);
  dataListFiltered = signal<IPokemonShort[]>([]);

  currentPage = signal(1);
  pageSize = signal(8);

  constructor(
    private readonly _pokeApiService: PokeapiService,
    private readonly _cryptojsService: CryptojsService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const encryptedFromStorage = localStorage.getItem(environment.encrypDataKey);
    if (encryptedFromStorage) {
      const decrypted: IPokemonShort[] = this._cryptojsService.decrypt(encryptedFromStorage) as IPokemonShort[];
      this.saveDataState(decrypted);
      this.onPageChanged(this.currentPage());
    } else {
      this.getPokemonData();
    }
  }

  getPokemonData(): void {
    this._pokeApiService.getPokemonAll().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.saveDataState(data.results.map((poke, i) => ({
          ...poke,
          nuevaPropiedadMap: i
        })), true);
        this.onPageChanged(this.currentPage());
      },
      error: () => this.loading.set(false),
    });
  }

  saveDataState(data: IPokemonShort[], updateStorage = false): void {
    console.log(data);
    this.dataListOriginal.set(data);
    if (updateStorage) {
      const encrypted = this._cryptojsService.encrypt(data);
      localStorage.setItem(environment.encrypDataKey, encrypted);
    }
    this.loading.set(false);
  }

  onPageChanged(page: number) {
    this.currentPage.set(page);
    const start = (page - 1) * this.pageSize();
    const end = start + this.pageSize();
    const originalData = this.dataListOriginal();
    const filteredData = originalData.slice(start, end);
    this.dataListFiltered.set(filteredData);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
