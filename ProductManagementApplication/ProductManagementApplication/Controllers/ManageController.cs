using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMatrix.WebData;
using ProductManagementApplication.Models;
using ProductManagementApplication.Models.DTO;
using System.Web.Script.Serialization;

namespace ProductManagementApplication.Controllers
{
    public class ManageController : Controller
    {
        private ManageRepository mngRepo = new ManageRepository();
        // GET: Manage
        public ActionResult Index()
        {
            return View();
        }

     
        public ActionResult Manage()
        {
            //if (!WebSecurity.IsAuthenticated)

            //{

            //    Response.Redirect("~/Account/Login");

            //}

            return View();
        }


        public ActionResult GetProductIdList()
        {
            var res = new JsonResult();
            var productIdList = mngRepo.GetProductIdList();

            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                productIdList
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return res;
        }
        public ActionResult SaveProducts(string productData)
        {
            var res = new JsonResult();
            try
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();
                Product jssProductData = jss.Deserialize<Product>((string)productData);
                var result = mngRepo.SaveProducts(jssProductData);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                ViewBag.Message = ex.Message;
                return View("Error");
            }
            return res;

        }
    }
}