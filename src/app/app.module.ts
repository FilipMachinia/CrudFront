import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CarOwnersComponent } from './products/car-owners.component';
import {AppRoutingModule} from './app-routing.module';
import { DeleteDialogComponent } from './products/delete-dialog/delete-dialog.component';
import {NumberPlatesService} from './products/number-plates.service';
import { EditDialogComponent } from './products/edit-dialog/edit-dialog.component';
import { UppercaseDirective } from './products/directives/uppercase.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarOwnersComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    UppercaseDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [DeleteDialogComponent, EditDialogComponent],
  providers: [NumberPlatesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
