import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import * as _ from 'lodash';
import { ConfirmComponent } from 'src/app/common/layout/confirm/confirm.component';
import { Blacklist } from './backlist.model';
import { BlacklistService } from './blacklist.service';

@Component({
  selector: 'app-blacklist-words',
  templateUrl: './blacklist-words.component.html',
  styleUrls: ['./blacklist-words.component.scss'],
})
export class BlacklistWordsComponent {
  submitted: boolean = false;
  filterData: string = '';

  private entityList: Blacklist[] = [];
  dataList: Blacklist[] = [];

  displayedColumns: string[] = ['wordBlocked', 'wordAccepted', 'actions'];

  constructor(
    private service: BlacklistService,
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

  onSave(obj: Blacklist) {
    this.dialogService
      .open(ConfirmComponent, {
        context: {
          modalData: 'Deseja Salvar?',
        },
      })
      .onClose.subscribe((confirm) => {
        if (confirm) {
          this.service.save(obj).subscribe((res) => {
            this.listAll();
          });
        }
      });
  }

  onAdd() {
    let blacklist: Blacklist = new Blacklist();

    if (this.dataList == null) {
      this.dataList = [];
    }

    this.dataList = [blacklist, ...this.dataList];
  }

  onRemove(obj: Blacklist) {
    this.dialogService.open(ConfirmComponent).onClose.subscribe((confirm) => {
      if (confirm) {
        if (obj.id != null && obj.id != 0) {
          this.service.delete(obj.id).subscribe((res) => {
            this.listAll();
          });
        } else {
          this.dataList = this.dataList.filter((d) => d != obj);
        }
      }
    });
  }

  filter() {
    if (this.filterData == null || this.filterData == '') {
      this.setDataList(this.entityList);
    }

    this.dataList = this.entityList.filter((data) =>
      data.wordBlocked
        .toLocaleLowerCase()
        .trim()
        .startsWith(this.filterData.toLocaleLowerCase().trim())
    );
  }

  isSaveDisabled(obj: Blacklist): boolean {
    return (
      obj.wordAccepted == null ||
      obj.wordAccepted.trim() == '' ||
      obj.wordBlocked == null ||
      obj.wordBlocked.trim() == ''
    );
  }
}
