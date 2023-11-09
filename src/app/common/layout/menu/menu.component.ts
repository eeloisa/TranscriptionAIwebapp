import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AuthService } from 'src/app/guard/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menus: NbMenuItem[] = [
    {
      title: 'Mídias',
      icon: 'play-circle-outline',
      link: '/group-media-list'
    },
    {
      title: 'Transcrições',
      icon: 'text-outline',
      link: '/transcription-list'
    },
    {
      title: 'Palavras Reservadas',
      icon: 'checkmark-square-outline',
      link: '/blacklist'
    },
    {
      title: 'Relatórios',
      icon: 'file-text-outline',
      link: '/report'
    },
    {
      title: 'Usuários',
      icon: 'people-outline',
      link: '/user-list'
    },
    {
      title: 'Parâmetros',
      icon: 'settings-2-outline',
      link: '/parameter'
    },
    {
      title: 'Auditoria',
      icon: 'shield-outline',
      link: '/audit'
    },

  ];

  items: NbMenuItem[] = [];

  constructor(private authService: AuthService){
    this.menus.forEach(menu => {
      if(authService.isPermittedRoute(menu.link)){
        this.items.push(menu);
      }
    });
  }
}
