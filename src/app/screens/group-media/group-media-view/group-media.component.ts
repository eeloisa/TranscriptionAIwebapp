import { AccountService } from './../../../common/services/account.service';
import { Component, NgZone } from '@angular/core';
import { GroupMediaService } from '../group-media.service';
import { GroupMedia, Media } from '../group-media.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TranscriptionStatusEnum,
  transcriptionStatusLabel,
} from 'src/app/common/enums/transcription-status.enum';
import {
  MediaTypeEnum,
  mediaTypeLabel,
} from 'src/app/common/enums/media-type.enum';
import { ConfirmComponent } from 'src/app/common/layout/confirm/confirm.component';
import { NbDialogService } from '@nebular/theme';
import { MediaComponent } from '../media-view/media.component';
import { LoadingService } from 'src/app/common/services/loading.service';

import {
  Storage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
  StorageError,
} from '@angular/fire/storage';

import { v4 as uuidv4 } from 'uuid';
import {
  GroupMediaPayload,
  MediaPayload,
} from 'src/app/common/payload/group-media.payload';
import { environment } from 'src/environments/environment';
import { identifyMediaFormat } from 'src/app/common/enums/media-format.enum';
import * as moment from 'moment';
import { getDateMask } from 'src/app/common/formatter/date-mask.formatter';
import { AuthService } from 'src/app/guard/auth.service';
import { Account } from '../../user/account.model';
import { formatSizeUnits, getFormatedDate } from 'src/app/common/utils/utils';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-group-media',
  templateUrl: './group-media.component.html',
  styleUrls: ['./group-media.component.scss'],
})
export class GroupMediaComponent {
  groupMedia: GroupMedia = new GroupMedia();
  groupMediaId: number = null;

  filter: any;
  filterData: any;

  dateInputMask = getDateMask();

  filters: string[] = ['Nome Mídia', 'Data Cadastro'];
  filterSelected = this.filters[0];

  displayedColumns: string[] = [
    'select',
    'title',
    'mediaType',
    'size',
    'order',
    'transcriptionStatus',
    'registrationDate',
    'user',
    'actions',
  ];

  uploadCompleted = 0;

  groupMediaPayload = new GroupMediaPayload();
  newMidias: Media[] = [];

  account: Account;

  selection: SelectionModel<Media>;

  constructor(
    private service: GroupMediaService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private loadingService: LoadingService,
    private storage: Storage,
    private zone: NgZone,
    private accountService: AccountService,
    private authService: AuthService
  ) {
    this.route.params.subscribe((params) => (this.groupMediaId = params['id']));

    if (this.isEdit()) {
      this.service.getById(this.groupMediaId).subscribe((data) => {
        if (data == undefined) {
          //ERROR
          return;
        }
        this.groupMedia = data;
      });
    }

    const initialSelection = [];
    this.selection = new SelectionModel<Media>(true, initialSelection);

    this.accountService
      .getById(this.authService.loggedUser.code)
      .subscribe((res) => {
        this.account = res;
        this.authService.account.emit(res);
      });
  }

  changeFilter() {
    this.filterData = this.filter = '';
  }

  setFilter() {
    this.filterData = this.filter;
  }

  isFilter() {
    return this.filterData != null && this.filterData != '';
  }

  isFilterByDate(): boolean {
    return this.filterSelected == this.filters[1];
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listData()?.length;
    return numSelected == numRows;
  }

  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.listData()?.forEach((row) => this.selection.select(row));
  }

  getSize(size: number): string {
    return formatSizeUnits(size);
  }

  listData(): Media[] {
    if (this.filterData == null || this.filterData == '') {
      return this.groupMedia.medias;
    }

    if (this.filterSelected == this.filters[0]) {
      //FILTER MEDIA NAME
      return this.groupMedia.medias?.filter((data) =>
        data.title
          .toLocaleLowerCase()
          .trim()
          .includes(this.filterData.toLocaleLowerCase().trim())
      );
    }

    if (this.filterSelected == this.filters[1]) {
      //FILTER MEDIA DATE
      return this.groupMedia.medias?.filter((data) => {
        return moment(data.registrationDate).isSameOrAfter(this.filterData);
      });
    }
  }

  getFormatedDate(date: string): string {
    return getFormatedDate(date);
  }

  mediaTypeLabel(value: MediaTypeEnum) {
    return mediaTypeLabel(value);
  }

  isEdit() {
    return this.groupMediaId != null && this.groupMedia != undefined;
  }

  openMediaModal(obj?: GroupMedia) {
    this.dialogService
      .open(MediaComponent, {
        context: {
          modalData: obj,
        },
      })
      .onClose.subscribe((data) => {
        if (data) {
          if (this.groupMedia.medias == null) {
            this.groupMedia.medias = [];
          }

          this.groupMedia.medias = [...this.groupMedia.medias, data];
        }
      });
  }

  transcriptionStatusLabel(value: TranscriptionStatusEnum) {
    return transcriptionStatusLabel(value);
  }

  toSave() {
    try {
      this.changeLoading(true);

      this.setupPayload();

      this.newMidias = this.groupMedia.medias?.filter((m) => m.file != null);
      if (this.newMidias.length == 0) {
        this.saveGroupMedia();
        return;
      }

      this.newMidias.forEach((media) => {
        let mediaPayload: MediaPayload = this.groupMediaPayload.medias.find(
          (m) => m.hashCode == media.hashCode
        );

        this.postFileRepo(mediaPayload, media.file);
      });
    } catch (event: any) {
      this.changeLoading(false);
      console.error(event);
      return event;
    }
  }

  private setupPayload() {
    this.groupMediaPayload = new GroupMediaPayload();

    this.groupMediaPayload.id = this.groupMedia.id;
    this.groupMediaPayload.title = this.groupMedia.title;
    this.groupMediaPayload.medias = [];

    this.groupMedia.medias.forEach((media) => {
      const mediaPayload = new MediaPayload();

      const mediaGuid = uuidv4();
      media.hashCode = mediaGuid;
      mediaPayload.hashCode = mediaGuid;

      mediaPayload.id = media.id;
      mediaPayload.order = media.order;
      mediaPayload.title = media.title;
      mediaPayload.fileName = media.id == null ? media.file.name : '-';
      mediaPayload.size = media.id == null ? media.file.size : 0;
      mediaPayload.bucketName = environment.firebase.storageBucket;

      mediaPayload.contentType = media.id == null ? media.file.type : '-';

      mediaPayload.mediaType = media.mediaType;

      let fileExtension =
        media.id == null ? media.file.name.split('.').pop() : '-';

      mediaPayload.subFolderBucket = '';

      mediaPayload.fileNameBucket =
        MediaTypeEnum[media.mediaType] +
        '.' +
        media.hashCode +
        '.' +
        fileExtension;

      mediaPayload.mediaFormat = identifyMediaFormat(mediaPayload.contentType);

      this.groupMediaPayload.medias.push(mediaPayload);
    });
  }

  private postFileRepo(media: MediaPayload, file: File) {
    const storageRef = ref(
      this.storage,
      media.subFolderBucket + '/' + media.fileNameBucket
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Update state to track all file changes
    const onChange = (snapshot: UploadTaskSnapshot) => {};
    const onError = (error: StorageError) => {
      this.setFilesStatus(error);
    };
    const onComplete = () => {
      this.setFilesStatus();
    };

    uploadTask.on('state_changed', onChange, onError, onComplete);
  }

  private setFilesStatus(status?: any) {
    this.zone.run(() => {
      if (status instanceof StorageError) {
        this.changeLoading(false);
        console.error('setFilesStatus====> ', status);
        return;
      }

      this.uploadCompleted++;

      if (this.newMidias.length == this.uploadCompleted) {
        this.saveGroupMedia();
      }
    });
  }

  private changeLoading(active: boolean) {
    this.loadingService.isLoadingEmitter.emit(active);
  }

  private saveGroupMedia() {
    this.service.save(this.groupMediaPayload).subscribe((res) => {
      this.router.navigate(['/group-media-list']);
    });
  }

  goBack() {
    this.router.navigate(['/group-media-list']);
  }

  onRemove(obj: Media) {
    this.dialogService.open(ConfirmComponent).onClose.subscribe((confirm) => {
      if (confirm) {
        this.remove(obj);
      }
    });
  }

  private remove(obj: Media, preservSelection?: boolean) {
    this.groupMedia.medias = this.groupMedia.medias.filter((v) => v != obj);

    if (!preservSelection) {
      this.selection.clear();
    }
  }

  isFormDisabled(): boolean {
    return (
      this.groupMedia.title == null ||
      this.groupMedia.title.trim() == '' ||
      this.groupMedia.medias == null ||
      this.groupMedia.medias.length == 0 ||
      this.isQuotaExceeded()
    );
  }

  isQuotaExceeded(): boolean {
    return this.account == null || this.account.userCotaAvailable <= 0;
  }

  deleteSelection() {
    this.dialogService.open(ConfirmComponent).onClose.subscribe((confirm) => {
      if (confirm) {
        let selectedMediasId: number[] = [];

        this.selection.selected.forEach((m) => {
          if (m.id != null) {
            selectedMediasId.push(m.id);
          }
        });

        if (selectedMediasId?.length > 0) {
          this.service
            .deleteSelection(this.groupMedia.id, selectedMediasId)
            .subscribe((res) => {
              this.removeAllSelected();
            });
        } else {
          this.removeAllSelected();
        }
      }
    });
  }

  private removeAllSelected() {
    this.selection.selected.forEach((selected) => {
      this.remove(selected, true);
    });

    this.selection.clear();
  }
}
