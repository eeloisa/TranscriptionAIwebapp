import { GroupMedia } from '../group-media.model';
import { Component } from '@angular/core';
import { GroupMediaService } from '../group-media.service';
import { Router } from '@angular/router';
import {
  TranscriptionStatusEnum,
  transcriptionStatusLabel,
} from 'src/app/common/enums/transcription-status.enum';
import * as _ from 'lodash';
import { ConfirmComponent } from 'src/app/common/layout/confirm/confirm.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-group-media-list',
  templateUrl: './group-media-list.component.html',
  styleUrls: ['./group-media-list.component.scss'],
})
export class GroupMediaListComponent {
  submitted: boolean = false;
  filterData: string = '';

  private groupMedias: GroupMedia[] = [];
  dataList: GroupMedia[] = [];

  displayedColumns: string[] = [
    'title',
    'transcriptionStatus',
    'user',
    'actions',
  ];

  constructor(
    private service: GroupMediaService,
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

  onAdd() {
    this.router.navigate(['/group-media']);
  }

  goTranscription(obj: GroupMedia) {
    this.router.navigate(['/transcription/' + obj.id]);
  }

  onEdit(obj: GroupMedia) {
    this.router.navigate(['/group-media/' + obj.id]);
  }

  onRemove(obj: GroupMedia) {
    this.dialogService.open(ConfirmComponent).onClose.subscribe((confirm) => {
      if (confirm) {
        if (obj.id != null && obj.id != 0) {
          this.service.delete(obj.id).subscribe((res) => {
            this.listAll();
          });
        } else {

        }
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
        .includes(this.filterData.toLocaleLowerCase().trim())
    );
  }
}
