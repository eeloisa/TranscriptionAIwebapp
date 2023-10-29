import { Component } from '@angular/core';
import { Parameter } from './parameter.model';
import { ParameterService } from './parameter.service';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ConfirmComponent } from 'src/app/common/layout/confirm/confirm.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss'],
})
export class ParameterComponent {
  submitted: boolean = false;
  filterData: string = '';

  private entityList: Parameter[] = [];
  dataList: Parameter[] = [];

  displayedColumns: string[] = ['name', 'code', 'description', 'value', 'actions'];

  constructor(
    private service: ParameterService,
    private router: Router,
    private dialogService: NbDialogService
  ) {
    this.listAll();
  }

  listAll() {
    this.service.getList().subscribe((res) => {
      this.entityList = res;
      this.setDataList(this.entityList);
    });
  }

  setDataList(data) {
    this.dataList = _.cloneDeep(data);
  }

  onSave(obj: Parameter) {
    this.dialogService
    .open(ConfirmComponent, {
      context: {
        modalData: "Salvar a Alteração?",
      },
    })
      .onClose.subscribe((confirm) => {
        if (confirm) {
          this.service.put(obj).subscribe((res) => {
            this.listAll();
          });
        }
      });
  }

  filter() {
    if (this.filterData == null || this.filterData == '') {
      this.setDataList(this.entityList);
    }

    this.dataList = this.entityList.filter((data) =>
      data.name
        .toLocaleLowerCase()
        .trim()
        .startsWith(this.filterData.toLocaleLowerCase().trim())
    );
  }

  isSaveDisabled(obj: Parameter): boolean{
    return obj.defaultValue == null || obj.defaultValue.trim() == "";
  }
}
