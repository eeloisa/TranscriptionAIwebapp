import { AuthService } from 'src/app/guard/auth.service';
import { Component } from '@angular/core';
import { Account } from '../account.model';
import { AccountService } from '../../../common/services/account.service';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import * as _ from 'lodash';
import {
  TranscriptionStatusEnum,
  transcriptionStatusLabel,
} from 'src/app/common/enums/transcription-status.enum';
import { ConfirmComponent } from 'src/app/common/layout/confirm/confirm.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  submitted: boolean = false;
  filterData: string = '';

  private accounts: Account[] = [];
  dataList: Account[] = [];

  displayedColumns: string[] = ['name', 'login', 'profileName', 'actions'];

  constructor(
    private service: AccountService,
    private router: Router,
    private dialogService: NbDialogService,
    private authService: AuthService
  ) {
    this.listAll();
  }

  listAll() {
    this.service.getList().subscribe((res) => {
      this.accounts = res;
      this.setDataList(this.accounts);
    });
  }

  setDataList(data) {
    this.dataList = _.cloneDeep(data);
  }

  onAdd() {
    this.router.navigate(['/user']);
  }

  onEdit(obj: Account) {
    this.router.navigate(['/user/' + obj.accountId]);
  }

  onRemove(obj: Account) {
    this.dialogService.open(ConfirmComponent).onClose.subscribe((confirm) => {
      if (confirm) {
        this.service.delete(obj.accountId).subscribe((res) => {
          this.listAll();
        });
      }
    });
  }

  transcriptionStatusLabel(value: TranscriptionStatusEnum) {
    return transcriptionStatusLabel(value);
  }

  filter() {
    if (this.filterData == null || this.filterData == '') {
      this.setDataList(this.accounts);
    }

    this.dataList = this.accounts.filter((data) =>
      data.accountName
        .toLocaleLowerCase()
        .trim()
        .startsWith(this.filterData.toLocaleLowerCase().trim())
    );
  }

  isDeletable(obj: Account) {
    return obj.accountId != this.authService.usuarioLogado.code;
  }
}
