import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { products } from '../../models/products';
import { UploadFilesService } from '../../services/upload-files.service';
import { ProductService } from '../../services/product.service';
import { SweetAlert } from '../Alerts';
import { MessagesToShow } from '../enums';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import * as ui from '../../shared/ui.actions';
@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent implements OnInit {
  @Input() productEdit: products;
  product: products;
  selectedImage: File | null = null;
  formattedPrice: string = '';
  alerts: SweetAlert;
  uiSubscription: Subscription;
  isLoading: boolean = false;
  constructor(public activeModal: NgbActiveModal,
    private fileUpload: UploadFilesService,
    private store: Store<AppState>,
    private productService: ProductService,
    private spinner: NgxSpinnerService) {
    this.product = new products();
    this.alerts = new SweetAlert();
  }
  ngOnInit(): void {
    if (this.productEdit?.id) {
      this.product = this.productEdit;
    }
    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => {
        this.isLoading = ui.isLoading;
        if (this.isLoading) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
      });
  }
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }
  async onSubmit() {
    this.store.dispatch(ui.isLoading());
    if (this.selectedImage) {
      await this.fileUpload.uploadFile(this.selectedImage, this.product.nombreProducto).then(rs => {
        this.product.avatar = rs;
      })
    }
    this.product.id = this.generateRandomId();
    await this.productService.createDocument('products', this.product).then((rs: any) => {
      this.store.dispatch(ui.stopLoading());
      rs.status === 200 ? this.alerts.showAlert(MessagesToShow.success.GOOD, "success", MessagesToShow.success.SUCCESSFUL_REGISTRATION) :
        this.alerts.showAlert(MessagesToShow.errorMessages.INVALID_ERROR, "error", rs.error)
      this.activeModal.close();
    })
  }
  generateRandomId(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }

  onClose() {
    this.activeModal.dismiss('Modal cerrado por el usuario');
  }
}
