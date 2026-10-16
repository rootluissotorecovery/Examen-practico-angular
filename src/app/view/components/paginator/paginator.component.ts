import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() totalItems = 0;
  @Input() pageSize = 5;
  @Output() pageChanged = new EventEmitter<number>();

  currentPage = signal(1);
  totalPages = computed(() => Math.ceil(this.totalItems / this.pageSize));

  constructor(
  ) { }

  get pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.pageChanged.emit(page);
    }
  }

  prev(): void {
    if (this.currentPage() === 1) {
      return;
    }
    this.changePage(this.currentPage() - 1);
  }

  next(): void {
    if (this.currentPage() === this.totalPages()) {
      return;
    }
    this.changePage(this.currentPage() + 1);
  }
}
