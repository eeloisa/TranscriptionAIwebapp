export enum MediaFormatEnum {
  Mp3 = 1,
  Wav = 2,
  Mp4 = 3,
  Ogg = 4,
  Flac = 5,
  Aac = 6,
  Aiff = 7,
  Basic = 8,
  M4A = 9,
  Wma = 10,

  //Video
  Mp4Video = 11,
  Webm = 12,
  M4v = 13,
  Avi = 14,
  Mpeg = 15,
  Mov = 16,
  Ogv = 17,
  Mpg = 18,
  Wmv = 19,
  Ogm = 20,

  NotIdentified = 999,
}

export function identifyMediaFormat(type: string) {
  if (type.toLowerCase().trim().includes('audio/wav'))
    return MediaFormatEnum.Wav;

  if (type.toLowerCase().trim().includes('audio/x-wav'))
    return MediaFormatEnum.Wav;

  if (type.toLowerCase().trim().includes('audio/wave'))
    return MediaFormatEnum.Wav;

  if (type.toLowerCase().trim().includes('audio/mpeg'))
    return MediaFormatEnum.Mp3;

  if (type.toLowerCase().trim().includes('audio/ogg'))
    return MediaFormatEnum.Ogg;

  if (type.toLowerCase().trim().includes('audio/flac'))
    return MediaFormatEnum.Flac;

  if (type.toLowerCase().trim().includes('audio/aac'))
    return MediaFormatEnum.Aac;

  if (type.toLowerCase().trim().includes('audio/aiff'))
    return MediaFormatEnum.Aiff;

  if (type.toLowerCase().trim().includes('audio/basic'))
    return MediaFormatEnum.Basic;

  if (type.toLowerCase().trim().includes('audio/x-ms-wma'))
    return MediaFormatEnum.Wma;

  if (type.toLowerCase().trim().includes('audio/x-aiff'))
    return MediaFormatEnum.Aiff;

  //Video
  if (type.toLowerCase().trim().includes('video/mp4'))
    return MediaFormatEnum.Mp4Video;

  if (type.toLowerCase().trim().includes('video/webm'))
    return MediaFormatEnum.Webm;

  if (type.toLowerCase().trim().includes('video/x-m4v'))
    return MediaFormatEnum.M4v;

  if (type.toLowerCase().trim().includes('video/x-msvideo'))
    return MediaFormatEnum.Avi;

  if (type.toLowerCase().trim().includes('video/mpeg'))
    return MediaFormatEnum.Mpeg;

  if (type.toLowerCase().trim().includes('video/quicktime'))
    return MediaFormatEnum.Mov;

  if (type.toLowerCase().trim().includes('video/ogg'))
    return MediaFormatEnum.Ogv;

  if (type.toLowerCase().trim().includes('video/mpeg'))
    return MediaFormatEnum.Mpg;

  if (type.toLowerCase().trim().includes('video/x-ms-wmv'))
    return MediaFormatEnum.Wmv;

  return MediaFormatEnum.NotIdentified;
}
