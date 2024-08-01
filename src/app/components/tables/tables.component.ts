import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit {
  mesas: any[] = [
    { id: 1, consumo: 150334 },
    { id: 2, consumo: 200 },
    { id: 3, consumo: 120 },
    { id: 4, consumo: 150 },
    { id: 5, consumo: 200 },
    { id: 6, consumo: 120 },
    { id: 7, consumo: 150 },
    { id: 8, consumo: 200 },
    { id: 9, consumo: 120 },
    // Agrega más mesas según sea necesario
  ];
  filteredMesas: any[] = [];
  searchTerm: string = '';
  constructor() {}

  ngOnInit(): void {
    this.filteredMesas = this.mesas;
  }
  filterMesas(): void {
    if (this.searchTerm) {
      this.filteredMesas = this.mesas.filter(mesa =>
        mesa.id.toString().includes(this.searchTerm)
      );
    } else {
      this.filteredMesas = this.mesas;
    }
  }
}
