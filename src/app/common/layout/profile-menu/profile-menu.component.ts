import { Account } from './../../../screens/user/account.model';
import { UserBrainz } from '../../model/user-brainz.model';
import { AuthService } from 'src/app/guard/auth.service';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  user: UserBrainz = new UserBrainz();
  items: NbMenuItem[] = [];

  account: Account = new Account();

  constructor(
    private authService: AuthService,
    private menuService: NbMenuService,
    private accountService: AccountService
  ) {
    this.user = authService.loggedUser;

    this.authService.account.subscribe((data) => {
      this.account = data;
    });

    this.items = [
      {
        title: this.user.profile,
      },
      /*{
        title: 'Editar',
        icon: 'edit-outline',
        link: '/user/' + this.user.code,
      },*/
      {
        title: 'Logout',
        icon: 'log-out-outline',
        data: () => {
          this.logout();
        },
      },
    ];

    this.menuService.onItemClick().subscribe((r) => {
      if (r.item.data !== undefined) {
        r.item.data();
      }
    });
  }

  ngOnInit(): void {
    this.accountService.getById(this.user.code).subscribe((res) => {
      this.authService.account.emit(res);
    });
  }

  logout() {
    this.authService.logout();
  }

  isQuotaExceeded(): boolean{
    return this.account.userCotaAvailable <= 10;
  }
}
