import { DownloadPayload } from '../../../common/payload/group-media.payload';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GroupMedia,
  Media,
  Transcription,
  Dialogue,
  Speaker,
} from '../../group-media/group-media.model';
import { TranscriptionService } from '../transcription.service';
import { MediaTypeEnum } from 'src/app/common/enums/media-type.enum';

import { NbDialogService } from '@nebular/theme';
import { SpeakerViewComponent } from '../speaker-view/speaker-view.component';
import { SpeakerPayload } from 'src/app/common/payload/group-media.payload';

import { saveAs } from 'file-saver';
import { Chat } from 'src/app/common/model/chat.model';
import { DownloadComponent } from 'src/app/common/layout/download/download.component';
import { DownloadTypeEnum } from 'src/app/common/enums/download-type.enum';

@Component({
  selector: 'app-transcription',
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss'],
})
export class TranscriptionComponent {
  groupMedia: GroupMedia = new GroupMedia();
  groupMediaId: number = null;

  transcription: Transcription = new Transcription();

  dialogues: Dialogue[] = [];

  medias: Media[] = [];
  media: Media;

  filterData: string = '';

  firstDialogue: Dialogue;

  textAskChat: string = '';
  textResponseChat: string = '';

  @ViewChild('videoPlayer')
  public videoPlayer: ElementRef;

  @ViewChild('audioPlayer')
  public audioPlayer: ElementRef;

  constructor(
    private service: TranscriptionService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {
    this.route.params.subscribe((params) => (this.groupMediaId = params['id']));

    this.service.getByGroupMediaId(this.groupMediaId).subscribe((data) => {
      if (data == undefined) {
        //ERROR
        return;
      }

      this.groupMedia = data;
      this.medias = this.groupMedia.medias;
      this.transcription = this.groupMedia.transcription;
      this.dialogues = this.transcription.dialogues;

      this.playMedia(this.dialogues[0]);
    });
  }

  getInfos(dialogue: Dialogue): string {
    const media = this.medias.find((m) => m.id == dialogue.mediaId);
    return media.title + ' - ' + this.toHHMMSS(dialogue.startTime);
  }

  toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };

  getSpeakerLabel(speaker: Speaker): string {
    const media = this.medias.find((m) => m.id == speaker.mediaId);
    return (
      speaker.name + ' - ' + media.title + ' - ' + speaker.totalInSeconds + 's'
    );
  }

  playMedia(dialogue: Dialogue, play?: boolean) {
    this.media = this.medias.find((m) => m.id == dialogue.mediaId);

    let player = this.videoPlayer;

    if (this.isVideo()) {
      this.hideElement(this.audioPlayer);
      this.showElement(this.videoPlayer);
    } else {
      player = this.audioPlayer;
      this.hideElement(this.videoPlayer);
      this.showElement(this.audioPlayer);
    }

    player.nativeElement.src = this.media.url;
    player.nativeElement.currentTime = dialogue.startTime;
    player.nativeElement.load();

    if (play) {
      player.nativeElement.play();
    }
  }

  private hideElement(ref: ElementRef) {
    ref.nativeElement.pause();
    ref.nativeElement.style.display = 'none';
  }

  private showElement(ref: ElementRef) {
    ref.nativeElement.style.display = 'inline-block';
  }

  isVideo(): boolean {
    return this.media.mediaType == MediaTypeEnum.Video;
  }

  download(downloadType: DownloadTypeEnum) {
    const downloadPayload: DownloadPayload = new DownloadPayload();
    downloadPayload.textQuestionIteration = this.textAskChat;
    downloadPayload.textIteration = this.textResponseChat;

    this.service
      .download(downloadPayload, this.groupMediaId, downloadType)
      .subscribe((blob) => {
        saveAs(
          blob,
          'transcription-' +
            this.groupMedia.title +
            '.' +
            DownloadTypeEnum[downloadType].toLowerCase()
        );
      });
  }

  openDownloadModal() {
    let downloadTypes: DownloadTypeEnum[] = [];
    downloadTypes.push(DownloadTypeEnum.Doc);
    downloadTypes.push(DownloadTypeEnum.Odt);
    downloadTypes.push(DownloadTypeEnum.Txt);
    downloadTypes.push(DownloadTypeEnum.Str);

    this.dialogService
      .open(DownloadComponent, {
        context: {
          modalData: downloadTypes,
        },
      })
      .onClose.subscribe((data) => {
        if (data) {
          this.download(data);
        }
      });
  }

  toAsk() {
    let chat: Chat = new Chat();
    chat.groupMediaId = this.groupMediaId;
    chat.question = this.textAskChat;

    this.service.chatAI(chat).subscribe((v) => {
      this.textResponseChat = v.response;
    });
  }

  editSpeaker(obj?: Speaker) {
    this.dialogService
      .open(SpeakerViewComponent, {
        context: {
          modalData: obj,
        },
      })
      .onClose.subscribe((data: SpeakerPayload) => {
        if (data) {
          data.groupMediaId = this.groupMediaId;
          this.service.patch(data).subscribe((r) => {
            //AJUSTA SPEAKERS TRANSCRIÇÂO
            this.dialogues.forEach((d) => {
              if (d.speaker == data.speaker) {
                d.speaker = data.speakerNew;
              }
            });

            this.transcription.speakers.forEach((d) => {
              if (d.name == data.speaker) {
                d.name = data.speakerNew;
              }
            });
          });
        }
      });
  }

  isAskDisabled() {
    return this.textAskChat == null || this.textAskChat.trim() == '';
  }

  findText() {
    this.dialogues = this.transcription.dialogues.filter((d) =>
      d.text.trim().toLowerCase().includes(this.filterData.trim().toLowerCase())
    );

    if (this.dialogues.length > 0) {
      this.playMedia(this.dialogues[0]);
    }
  }
}
