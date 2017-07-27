using System.Threading.Tasks;
using DevExpress.XtraReports.Web.WebDocumentViewer.Native.Services;
using Microsoft.AspNetCore.Mvc;

namespace DevExpressASPNETCoreReporting.Controllers
{
    public class ReportViewerController : RequestControllerBase
    {
        public ReportViewerController(IWebDocumentViewerRequestManager requestManager) : base(requestManager) { }

        [Route("DXXRDV")]
        public Task<IActionResult> ViewerInvoke()
        {
            return base.Invoke();
        }
    }
}