import { Component, OnInit } from '@angular/core';
import { products } from '../../models/products';
import { Observable, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from '../../shared/product-modal/product-modal.component';
import { ProductService } from '../../services/product.service';
import * as ui from '../../shared/ui.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlert } from '../../shared/Alerts';
import { MessagesToShow } from '../../shared/enums';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  products$: Observable<any[]>;
  listProducts: Array<products>;
  uiSubscription: Subscription;
  isLoading: boolean = false;
  alerts: SweetAlert;
  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService
  ) {
    this.alerts = new SweetAlert();
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => {
        this.isLoading = ui.isLoading;
        if (this.isLoading) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
      });

    this.getProducts();
  }
  getProducts() {
    this.store.dispatch(ui.isLoading());
    this.products$ = this.productService.getListProduct();
    this.products$.subscribe((rs) => {
      this.listProducts = rs;
      this.store.dispatch(ui.stopLoading());
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
  deleteProduct(idPruct: string) {
    this.store.dispatch(ui.isLoading());
    this.productService.deleteDocument('products', idPruct).then((rs: any) => {
      this.store.dispatch(ui.stopLoading());
      rs.status === 200 ? this.alerts.showAlert(MessagesToShow.success.GOOD, "success", MessagesToShow.success.SUCCESSFUL_DELETE) :
        this.alerts.showAlert(MessagesToShow.errorMessages.INVALID_ERROR, "error", rs.error)
    })
  }
  editProduct(product: products) {
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.productEdit = product;
    modalRef.result.then(
      (result) => {
        console.log('Modal result:', result);
      },
      (reason) => {
        console.log('Modal dismissed: ', reason);
      }
    );
  }
  increaseQuantity(product: any) {
    if (!product.quantity) {
      product.quantity = 2;
    } else if (product.quantity < 100) {
      product.quantity += 1;
    }
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    }
  }

}
