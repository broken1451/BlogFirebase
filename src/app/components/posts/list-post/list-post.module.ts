import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPostRoutingModule } from './list-post-routing.module';
import { ListPostComponent } from './list-post.component';
import { MaterialModule } from '../../../material/material.module';
import { TableComponent } from '../../../shared/component/table/table.component';


@NgModule({
  declarations: [ListPostComponent, TableComponent],
  imports: [
    CommonModule,
    ListPostRoutingModule,
    MaterialModule
  ]
})
export class ListPostModule { }
