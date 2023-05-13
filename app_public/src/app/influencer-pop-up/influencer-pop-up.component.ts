import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {RestService} from "../rest.service";
import { Influencer } from '../pages/dashboard/dashboard.component';

@Component({
  selector: 'app-influencer-pop-up',
  templateUrl: './influencer-pop-up.component.html',
  styleUrls: ['./influencer-pop-up.component.scss']
})
export class InfluencerPopUpComponent implements OnInit {

  @Input() public id = null;
  public influencer = null;
  constructor(public activeModal: NgbActiveModal,
    private restService: RestService) { }

  ngOnInit(): void {
    console.log("pop up")
    console.log(this.id)
    this.getInfluencerById(this.id)
    this.contactInfluencer()
    console.log(document.getElementsByTagName("ngb-modal-backdrop"))
  }

  getInfluencerById(id: any){
    console.log("u popup")
    this.restService
        .getInfluencerById(this.id)
        .subscribe((influencer: Influencer) => {
        console.log("vo opoup e")
        console.log(influencer);
        this.influencer = influencer
    }, (err) => {
        console.log(err)
        });
  }

  contactInfluencer() {
    console.log("send mail")
  }

}
