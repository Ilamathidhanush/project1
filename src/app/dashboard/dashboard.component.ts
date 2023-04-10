// import { HttpClient } from '@angular/common/http';
// import { Component, Input } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
// })
// export class DashboardComponent {
//   data = {
//     "periodicity":'',
//     "periods":'',
//     "csv":''
//   }
//   onSubmit(form: NgForm) {

//     const formData = new FormData();
//     formData.append('periodicity', form.value.periodicity);
//     formData.append('periods', form.value.periods);
//     formData.append('csv', this.data.csv)
//     this.httpClient.post('http://172.16.72.102:5000/upload', formData).subscribe({
//       next: (value)=>{
//         console.log("value")
//         //@ts-ignore
//         const base64ImageData = value.img
//         let ig = (document.getElementById("result") as HTMLImageElement)
//         ig.src = `data:image/png;base64,${base64ImageData}`;
//         ig.removeAttribute('hidden')
//       },
//       complete: ()=>{
//         console.log('Form submitted successfully');
//         // handle response from server
//       },
//       error: (error)=> {
//         console.error('Error submitting form', error);
//       // handle error from server
//       },
//     }
//     );
//     // this.gotopre()
//   }
//   constructor(private router: Router, private httpClient: HttpClient) {}
//   files: File[] = [];

//   onSelect(event: any) {
//     console.log(event);
//     this.files.push(...event.addedFiles);
//   }

//   onRemove(event: any) {
//     console.log(event);
//     this.files.splice(this.files.indexOf(event), 1);
//   }
//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     this.data.csv = file;
//   }

//   // gotopre() {
//   //   this.router.navigate(['/predict']);

//   // }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data = {
    periodicity: '',
    periods: '',
    csv: '',
  };
  router: any;
  onSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('periodicity', form.value.periodicity);
    formData.append('periods', form.value.periods);
    formData.append('csv', this.data.csv);
    console.log(this.data.csv)
    this.http.post('http://localhost:5000/upload', formData).subscribe({
      next: (value) => {
        console.log(value);
        //@ts-ignore
        const base64ImageData = value.img;
        let ig = document.getElementById('result') as HTMLImageElement;
        ig.src = `data:image/png;base64,${base64ImageData}`;
        ig.removeAttribute('hidden');
      },
      complete: () => {
        console.log('Form submitted successfully');
        // handle response from server
      },
      error: (error) => {
        console.error('Error submitting form', error);
        // handle error from server
      
      },
    });
    
  }
 
  constructor(private auth: AuthService, private http: HttpClient) {}

  user = { localId: 'someid', displayName: 'somename' };
  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
      //call user details service
      this.auth.detail().subscribe({
        next: (data) => {
          this.user.localId = data.users[0].localId;
          this.user.displayName = data.users[0].displayName;
        },
      });
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];    
    this.data.csv = file;
  }
  gotopre() {
    this.router.navigate(['/predict']);
  }
}
