
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Influencer} from "./pages/dashboard/dashboard.component";

import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  private apiUrl = "http://localhost:3000/api";

  public getInfluencers(): Observable<Influencer[]> {
    console.log("vo get nfluencer rest service")

    const url: string =`${this.apiUrl}/influencers`;
    console.log(url);
    return this.http
        .get<Influencer[]>(url)
        .pipe(retry(1), catchError(this.obdelajNapako))
  }

  public obdelajNapako(napaka: HttpErrorResponse) {

    return throwError(
        () =>
            `Prišlo je do napake '${napaka.message}' z opisom`
    );
  }
}
