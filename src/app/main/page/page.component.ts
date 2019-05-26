import {Component, OnInit} from '@angular/core';
import {InteractionService} from '../interaction.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(private interaction: InteractionService) {
  }

  ngOnInit() {
  }

  fun_test() {
    this.interaction.communication_test()
      .subscribe((data) => console.log(data));
  }
}
