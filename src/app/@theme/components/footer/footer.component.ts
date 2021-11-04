import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by <b><a href="https://www.linkedin.com/in/atakan-demirkol-857519154/" target="_blank">Demirkol-Hugo Boss</a></b> 2021
    </span>
  `,
})
export class FooterComponent {
}
