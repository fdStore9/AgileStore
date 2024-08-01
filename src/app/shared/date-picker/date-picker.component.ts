import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent implements OnInit {
  @Input() fechaNacimiento: any | '';
  @Output() dateFormatted = new EventEmitter<NgbDateStruct>();
  model: NgbDateStruct;
  user$: Observable<Usuario>;
  user: Usuario = new Usuario();
  constructor(private store: Store<{ user: Usuario }>) {
    this.user$ = this.store.select('user');
  }
  ngOnInit(): void {
    console.log(this.fechaNacimiento, 'fabian');
    this.model = this.parseDate(this.fechaNacimiento);
  }

  onDateSelect(date: NgbDateStruct) {
    this.dateFormatted.emit(date);
  }
  parseDate(dateStr: string): NgbDateStruct {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    dateStr = dateStr.replace('de', '');
    const [day, monthStr, year] = dateStr.split(' ');
    const month = months.indexOf(monthStr.toLowerCase()) + 1;

    return {
      day: +day,
      month: month,
      year: +year
    };
  }
}
