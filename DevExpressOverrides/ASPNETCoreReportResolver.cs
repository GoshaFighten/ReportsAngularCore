using System;
using DevExpress.XtraReports.UI;
using DevExpress.XtraReports.Web.WebDocumentViewer;

namespace DevExpressASPNETCoreReporting.DevExpressOverrides {
    public class ASPNETCoreReportResolver : IWebDocumentViewerReportResolver {
        public XtraReport Resolve(string reportEntry) {
            if (reportEntry == "Categories") {
                return new CategoriesReport();
            }
            throw new ArgumentException("Could not found report with id: " + reportEntry);
        }
    }
}
