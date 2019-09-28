import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  profile: object;
  userName;
  isLoading = false;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
  }

  getDetails() {
    this.isLoading = true;
    if(localStorage.getItem(this.userName)) {
    this.profile = JSON.parse(localStorage.getItem(this.userName));
    console.log('this is from local');
    this.isLoading = false;
    } else {
    this.getDetailsFromServer();
    this.isLoading = false;
    }
  }

  getDetailsFromServer() {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get('https://api.github.com/users/' + this.userName + '?access_token=002a87873d7731e7568a6b008fb0ecda8b02f7a0').subscribe((res) => {
      localStorage.setItem(this.userName, JSON.stringify(res));
      this.profile = res;
      this.isLoading = false;
    },
      () => {
        this.snackBar.open('User not found', ' ', {
          duration: 2000,
        });
        this.isLoading = false;
      }
    );
  }


  ngOnInit() {
  }



}
