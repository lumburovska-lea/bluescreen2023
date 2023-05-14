
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Influencer} from "./pages/dashboard/dashboard.component";
import { Router } from '@angular/router';

import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private modalService: NgbModal, private router: Router) { }

  private apiUrl = "http://localhost:3000/api";

  public getInfluencers(): Observable<Influencer[]> {
    console.log("vo get nfluencer rest service")

    const url: string =`${this.apiUrl}/influencers`;
    console.log(url);
    return this.http
        .get<Influencer[]>(url)
        .pipe(retry(1), catchError(this.obdelajNapako))
  }

  public getInfluencerById(id: String): Observable<Influencer> {
    console.log("vo get nfluencer rest service")

    const url: string =`${this.apiUrl}/influencers/${id}`;
    console.log(url);
    return this.http
        .get<Influencer>(url)
        .pipe(retry(1), catchError(this.obdelajNapako))
  }

  public obdelajNapako(napaka: HttpErrorResponse) {

    return throwError(
        () =>
            `Prišlo je do napake '${napaka.message}' z opisom`
    );
  }

  public logIn(email: String, password: String) {
    const body = {
      email: email,
      password: password
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const url: string =`${this.apiUrl}/businesses/login`;

    this.http.post(url, body, { headers, withCredentials: true }).subscribe(
      response => {
        console.log('Response:', response);
        this.router.navigate(['/dashboard'])
      },
      error => {
        console.error('Error:', error);
        // Handle the error
      }
    );
}}
