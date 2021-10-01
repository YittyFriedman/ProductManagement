using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMatrix.WebData;

namespace ProductManagementApplication.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //**
            //if (!WebSecurity.IsAuthenticated)

            //{

            //Response.Redirect("~/Account/Login");

            // }
           return View();
        }

      

        public ActionResult Manage()
        {
            //**
            //if (!WebSecurity.IsAuthenticated)

            //{

            //    Response.Redirect("~/Account/Login");

        //    }
        
            return View();
        }
      
    }
}