import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { DataService } from 'src/app/shared/service/data.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  fundArr : any[] = []
  fund !: number;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataApi: DataService,
   ) {
   }

  ngOnInit(): void {
    this.getFund()
    }

  getFund() {
    this.dataApi.getFund().subscribe(res => {
      this.fundArr = res.map((e : any) => {
        const data = e.payload.doc.data();
        this.fund = data.fund;
      })
    })
  }
}
