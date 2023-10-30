import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DownloadTypeEnum } from '../../enums/download-type.enum';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {
  @Input() modalData: any = null;
  message = 'Selecione formato de Arquivo:';

  downloadTypes: DownloadTypeEnum[];
  downloadTypeSelected: DownloadTypeEnum;

  constructor(protected ref: NbDialogRef<DownloadComponent>) {
    this.downloadTypes = <DownloadTypeEnum[]>Object.values(DownloadTypeEnum);
    this.downloadTypes = this.downloadTypes.splice(
      this.downloadTypes.length / 2
    );
  }

  ngOnInit(): void {
    if (this.modalData != null) {
      this.downloadTypes = this.modalData;
    }

    this.downloadTypeSelected = this.downloadTypes[0];
  }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(this.downloadTypeSelected);
  }

  enumLabel(enumValue: DownloadTypeEnum): string {
    return DownloadTypeEnum[enumValue];
  }
}
