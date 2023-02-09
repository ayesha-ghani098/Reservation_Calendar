import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';

// Services
import { ReservationService } from '../../services/reservation/reservation.service';
import { UtilityService } from '../../services/utility/utility.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ReservationService,UtilityService]
})
export class FormComponent implements OnInit {
  @Output() generateCalendar = new EventEmitter();

  @Input() mode: 'add' | 'delete' = 'add';
  @Output() closeForm = new EventEmitter();

  @Input() selectedDate: any;
  @Input() selectedTenant: any;

  date: string = '';
  tenant: string = '';

  constructor(
    private reservationService: ReservationService,
    private utility: UtilityService
  ) {}

  ngOnInit() {}

  // Add Tenant Handler
  addTenant() {
    if (this.tenant !== '') {
      this.reservationService.reserve(
        this.tenant,
        Date.parse(this.selectedDate)
      );
      this.utility.notifyDataChanged();
      this.closeForm.emit();
      this.reset();
    } else {
      console.log('Please provide a Tenant Name');
    }
  }

  // Delete Tenant Handler
  deleteTenant() {
    this.reservationService.unReserve(
      this.selectedTenant,
      Date.parse(this.selectedDate)
    );
    this.utility.notifyDataChanged();
    this.closeForm.emit();
    this.reset();
  }

  reset() {
    this.tenant = '';
    this.selectedTenant = '';
  }
}
