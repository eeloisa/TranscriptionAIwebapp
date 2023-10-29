import { SpeakerPayload } from './../../../common/payload/group-media.payload';
import { Component, Input, OnInit } from '@angular/core';
import { Speaker } from '../../group-media/group-media.model';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-speaker-view',
  templateUrl: './speaker-view.component.html',
  styleUrls: ['./speaker-view.component.scss'],
})
export class SpeakerViewComponent implements OnInit {
  @Input() modalData: any = null;

  mediaTypes: any[];

  speakerPayload: SpeakerPayload = new SpeakerPayload();

  constructor(protected ref: NbDialogRef<SpeakerViewComponent>) {}

  ngOnInit(): void {
    const speaker: Speaker = this.modalData;
    this.speakerPayload.speaker = speaker.name;
    this.speakerPayload.mediaId = speaker.mediaId;
  }

  isFormDisabled(){
    return this.speakerPayload.speakerNew == null || this.speakerPayload.speakerNew.trim() == "";
  }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(this.speakerPayload);
  }
}
