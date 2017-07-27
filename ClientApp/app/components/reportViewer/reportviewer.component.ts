import { Component, ViewChild, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

import "jquery-ui";

import * as ko from 'knockout';
import 'devextreme/integration/knockout';

import 'devextreme/ui/text_box';
import 'devextreme/core/component_registrator';
import 'devextreme/ui/popup';
import 'devextreme/data/array_store';
import 'devextreme/ui/drop_down_editor/ui.drop_down_editor';
import 'devextreme/ui/gallery';
import 'devextreme/core/config';
import 'devextreme/ui/validation_engine';
import 'devextreme/ui/notify';

import 'devextreme/localization/globalize/number';
import 'devextreme/localization/globalize/date';
import 'devextreme/localization/globalize/currency';
import 'devextreme/localization/globalize/message';

import 'globalize';

import "dx-designer";
import "web-document-viewer";

import * as WebDocumentViewer from "web-document-viewer.html";

let DevExpress: any;

@Component({
    selector: 'report-viewer',
    templateUrl: './reportviewer.component.html'
})
export class ReportViewerComponent implements AfterViewInit {
    angularText = 'Angular Button';
    constructor(private renderer: Renderer2) { }

    @ViewChild('report')
    report: ElementRef;

    ngAfterViewInit() {
        const backendPrefix = 'http://localhost:50720/';
        window["DevExpress"].Report.Preview.HandlerUri = backendPrefix + 'api/WebDocumentViewerWebApi';
        const container = this.renderer.createElement("div");
        container.innerHTML = WebDocumentViewer;
        this.renderer.appendChild(this.report.nativeElement, container);
        const viewerModel = ko.observable(null);
        viewerModel.subscribe(function (newVal) {
            if (newVal) {
                newVal.reportPreview.openReport("SampleReport");
            }
        })
        ko.applyBindings({
            viewerModel: viewerModel
        }, this.report.nativeElement);
    }
}
