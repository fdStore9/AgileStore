import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit{
  products = [
    {
      name: 'Pan de Miel',
      price: 5.00,
      description: 'Delicioso pan de miel recién horneado, perfecto para el desayuno.',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Croissant',
      price: 3.00,
      description: 'Crujiente croissant con relleno de chocolate, ideal para cualquier momento del día.',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Tarta de Manzana',
      price: 7.00,
      description: 'Tarta de manzana casera con una masa crujiente y relleno de manzanas frescas.',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Pan de Miel',
      price: 5.00,
      description: 'Delicioso pan de miel recién horneado, perfecto para el desayuno.',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Croissant',
      price: 3.00,
      description: 'Crujiente croissant con relleno de chocolate, ideal para cualquier momento del día.',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Tarta de Manzana',
      price: 7.00,
      description: 'Tarta de manzana casera con una masa crujiente y relleno de manzanas frescas.',
      image: 'https://via.placeholder.com/400x300'
    }
  ];

  constructor() { }
  ngOnInit(): void {
    
  }

}
