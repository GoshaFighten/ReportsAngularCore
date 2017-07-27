import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevExtremeModule } from 'devextreme-angular';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ReportViewerComponent } from './components/reportViewer/reportviewer.component';

export const sharedConfig: NgModule = {
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ReportViewerComponent
    ],
    imports: [
        DevExtremeModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'report-viewer', component: ReportViewerComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};
