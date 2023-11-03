import * as moment from 'moment';
import { Parameter } from 'src/app/screens/parameter/parameter.model';

export function getParamValue(params: Parameter[], code: string): string {
  return params.find((p) => p.code == code).defaultValue;
}

export function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + ' GB';
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes > 1) {
    bytes = bytes + ' bytes';
  } else if (bytes == 1) {
    bytes = bytes + ' byte';
  } else {
    bytes = '0 bytes';
  }
  return bytes;
}

export function isStrongPassword(password): boolean {
  if (password == null || password == '') return;

  var letrasMaiusculas = /[A-Z]/;
  var letrasMinusculas = /[a-z]/;
  var numeros = /[0-9]/;
  var caracteresEspeciais = /[!|@|.||#|$|%|^|&|*|(|)|-|_]/;

  if (password.length < 6) return false;

  var auxMaiuscula = 0;
  var auxMinuscula = 0;
  var auxNumero = 0;
  var auxEspecial = 0;

  for (var i = 0; i < password.length; i++) {
    if (letrasMaiusculas.test(password[i])) auxMaiuscula++;
    else if (letrasMinusculas.test(password[i])) auxMinuscula++;
    else if (numeros.test(password[i])) auxNumero++;
    else if (caracteresEspeciais.test(password[i])) auxEspecial++;
  }

  if (auxMaiuscula == 0) return false;
  if (auxMinuscula == 0) return false;
  if (auxNumero == 0) return false;
  if (auxEspecial == 0) return false;

  return true;
}

export function getFormatedDate(date: string): string {
  if (date == null) {
    return;
  }
  return moment(date).format('DD/MM/YYYY HH:mm:ss');
}
