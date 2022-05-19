using INSS.GDS.Toolkit.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace INSS.GDS.Toolkit.Controllers;
public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    [Route("/home/accessibility-statement")]
    public IActionResult AccessibilityStatement()
    {
        return View();
    }

    public IActionResult Accordions()
    {
        return View();
    }

    public IActionResult Contact()
    {
        return View();
    }

    public IActionResult Cookies()
    {
        return View();
    }

    [Route("/home/privacy-policy")]
    public IActionResult PrivacyPolicy()
    {
        return View();
    }

    public IActionResult Tabs()
    {
        return View();
    }

    [Route("/home/terms-and-conditions")]
    public IActionResult TermsAndConditions()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
