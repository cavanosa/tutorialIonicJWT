import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoPageRoutingModule } from './nuevo-routing.module';

import { NuevoPage } from './nuevo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NuevoPage]
})
export class NuevoPageModule {}
