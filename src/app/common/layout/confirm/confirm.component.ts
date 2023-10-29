import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  @Input() modalData: any = null;
  message = 'Deletar Registro?';

  constructor(protected ref: NbDialogRef<ConfirmComponent>) {}

  ngOnInit(): void {
    if (this.modalData != null) {
      this.message = this.modalData;
    }
  }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(true);
  }
}
