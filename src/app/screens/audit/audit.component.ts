import { AuditService } from './audit.service';
import { Component } from '@angular/core';
import { Audit, getAction } from './audit.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss'],
})
export class AuditComponent {
  submitted: boolean = false;
  filterData: string = '';

  private parameters: Audit[] = [];
  dataList: Audit[] = [];

  displayedColumns: string[] = [
    'entityName',
    'action',
    'userId',
    'inclusionDate',
  ];

  constructor(private service: AuditService) {
    this.listAll();
  }

  listAll() {
    this.service.getList().subscribe((res) => {
      this.parameters = res;
      this.setDataList(this.parameters);
    });
  }

  setDataList(data) {
    this.dataList = _.cloneDeep(data);
  }

  getAction(action: string){
    return getAction(action);
  }

  filter() {
    if (this.filterData == null || this.filterData == '') {
      this.setDataList(this.parameters);
    }

    this.dataList = this.parameters.filter((data) =>
      data.userId
        .toLocaleLowerCase()
        .trim()
        .includes(this.filterData.toLocaleLowerCase().trim())
    );
  }
}
