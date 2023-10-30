export enum DownloadTypeEnum {
  Doc = 1,
  Xls = 2,
  Csv = 3,
  Odt = 4,
  Ods = 5,
  Str = 6,
  Txt = 7
}

export function getAllDownloadEnumKeys(): DownloadTypeEnum[]{
  let downloadTypes: DownloadTypeEnum[];
  downloadTypes = <DownloadTypeEnum[]>Object.values(DownloadTypeEnum);
  downloadTypes = downloadTypes.splice(
    downloadTypes.length / 2
  );

  return downloadTypes;
}
