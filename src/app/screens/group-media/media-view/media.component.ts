import { Media } from './../group-media.model';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  MediaTypeEnum,
  mediaTypeLabel,
} from 'src/app/common/enums/media-type.enum';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  @Input() modalData: any = null;

  fileName: string = '';
  media: Media = new Media();

  constructor(protected ref: NbDialogRef<MediaComponent>) {
    this.reset();
  }

  ngOnInit(): void {
    if (this.isViewMode()) {
      this.media = this.modalData;
    }
  }

  isViewMode(): boolean {
    return this.modalData != null;
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];

      this.media.file = file;
      this.media.url = URL.createObjectURL(file);
      this.media.size = file.size;

      this.media.mediaType = file.type.trim().toLowerCase().includes('audio')
        ? MediaTypeEnum.Audio
        : MediaTypeEnum.Video;

      this.fileName = file.name;
    } else {
      this.reset();
    }
  }

  mediaTypeLabel(value: MediaTypeEnum) {
    return mediaTypeLabel(value);
  }

  reset() {
    this.fileName = 'Upload Mídia';
    this.media.file = null;
    this.media.url = '';
  }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(this.media);
  }

  isFormDisabled(): boolean {
    return (
      this.media.title == null ||
      this.media.title.trim() == '' ||
      this.media.file == null ||
      this.media.order <= 0 ||
      this.media.order == null
    );
  }

  isAudio() {
    return this.media.mediaType == MediaTypeEnum.Audio;
  }
}
