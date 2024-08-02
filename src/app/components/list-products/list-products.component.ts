import { Component, OnInit } from '@angular/core';
import { products } from '../../models/products';
import { Observable } from 'rxjs';
import { UploadFilesService } from '../../services/upload-files.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from '../../shared/product-modal/product-modal.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  products$: Observable<any[]>;
  listProducts: Array<products>;
  constructor(private fileService: UploadFilesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.products$ = this.fileService.getMesas();
    this.products$.subscribe((rs) => {
      this.listProducts = rs;
    })
  }
  openProductModal() {
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'lg', centered: true });
    modalRef.result.then(
      (result) => {
        console.log('Modal result:', result);
      },
      (reason) => {
        console.log('Modal dismissed: ', reason);
      }
    );
  }

}
