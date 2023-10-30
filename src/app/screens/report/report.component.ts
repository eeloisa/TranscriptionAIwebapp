import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import * as _ from 'lodash';
import { DownloadTypeEnum } from 'src/app/common/enums/download-type.enum';
import { ReportEnum, reportLabel } from 'src/app/common/enums/report.enum';
import { DownloadComponent } from 'src/app/common/layout/download/download.component';
import { saveAs } from 'file-saver';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  submitted: boolean = false;
  filterData: string = '';

  private entityList: ReportEnum[] = [];
  dataList: ReportEnum[] = [];

  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    private service: ReportService,
    private router: Router,
    private dialogService: NbDialogService
  ) {
    this.listAll();
  }

  listAll() {
    this.entityList = <ReportEnum[]>Object.values(ReportEnum);
    this.entityList = this.entityList.splice(this.entityList.length / 2);

    this.setDataList(this.entityList);
  }

  setDataList(data) {
    this.dataList = _.cloneDeep(data);
  }

  download(report: ReportEnum, downloadType: DownloadTypeEnum) {
    this.service.download(report, downloadType).subscribe((blob) => {
      saveAs(
        blob,
        'report-' +
          reportLabel(report) +
          '.' +
          DownloadTypeEnum[downloadType].toLowerCase()
      );
    });
  }

  reportLabel(report: ReportEnum): string{
    return reportLabel(report);
  }

  openDownloadModal(report: ReportEnum) {
    this.dialogService
      .open(DownloadComponent, {
        context: {
          modalData: null,
        },
      })
      .onClose.subscribe((data) => {
        if (data) {
          this.download(report, data);
        }
      });
  }

  filter() {
    if (this.filterData == null || this.filterData == '') {
      this.setDataList(this.entityList);
    }

    this.dataList = this.entityList.filter((data) =>
      reportLabel(data)
        .toLocaleLowerCase()
        .trim()
        .startsWith(this.filterData.toLocaleLowerCase().trim())
    );
  }
}
