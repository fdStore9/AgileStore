import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
  @Input() showDate: Boolean;
  @Output() dateFormated = new EventEmitter<NgbDateStruct>();
  model: NgbDateStruct;

}
