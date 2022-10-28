import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu-padres',
  templateUrl: './menu-padres.component.html',
  styleUrls: ['./menu-padres.component.css']
})
export class MenuPadresComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private oberver: BreakpointObserver) {  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    this.oberver.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

}