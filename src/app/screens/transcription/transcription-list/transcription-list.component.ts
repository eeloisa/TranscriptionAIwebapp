import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  TranscriptionStatusEnum,
  transcriptionStatusLabel,
} from 'src/app/common/enums/transcription-status.enum';
import * as _ from 'lodash';
import { ConfirmComponent } from 'src/app/common/layout/confirm/confirm.component';
import { NbDialogService } from '@nebular/theme';
import { GroupMedia } from '../../group-media/group-media.model';
import { TranscriptionService } from '../transcription.service';

@Component({
  selector: 'app-transcription-list',
  templateUrl: './transcription-list.component.html',
  styleUrls: ['./transcription-list.component.scss'],
})
export class TranscriptionListComponent {
  submitted: boolean = false;
  filterData: string = '';

  private groupMedias: GroupMedia[] = [];
  dataList: GroupMedia[] = [];

  displayedColumns: string[] = ['title', 'user', 'actions'];

  constructor(
    private service: TranscriptionService,
    private router: Router,
    private dialogService: NbDialogService
  ) {
    this.listAll();
  }

  listAll() {
    this.service.getList().subscribe((res) => {
      this.groupMedias = res;
      this.setDataList(this.groupMedias);
    });
  }

  setDataList(data) {
    this.dataList = _.cloneDeep(data);
  }

  goTranscription(obj: GroupMedia) {
    this.router.navigate(['/transcription/' + obj.id]);
  }

  onRemove(obj: GroupMedia) {
    this.dialogService.open(ConfirmComponent).onClose.subscribe((confirm) => {
      if (confirm) {
        this.service.delete(obj.id).subscribe((res) => {
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
      this.setDataList(this.groupMedias);
    }

    this.dataList = this.groupMedias.filter((data) =>
      data.title
        .toLocaleLowerCase()
        .trim()
        .startsWith(this.filterData.toLocaleLowerCase().trim())
    );
  }
}
