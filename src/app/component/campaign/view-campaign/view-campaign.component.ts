import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-view-campaign',
  templateUrl: './view-campaign.component.html',
  styleUrls: ['./view-campaign.component.scss']
})
export class ViewCampaignComponent {
  campaign_id !:any;
  campaignObj !:any;

  constructor(
    private route : ActivatedRoute,
    private dataApi : DataService
  ){
    this.campaign_id = route.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.getCampaignById();
  }

  getCampaignById(){
    this.dataApi.getCampaignById(this.campaign_id).subscribe(res => {
      this.campaignObj = res;
    })
  }
}
