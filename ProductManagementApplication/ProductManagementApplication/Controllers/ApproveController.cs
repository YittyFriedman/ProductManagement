using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMatrix.WebData;
using ProductManagementApplication.Models;
using ProductManagementApplication.Models.DTO;

namespace ProductManagementApplication.Controllers
{
    public class ApproveController : Controller
    {
        private ApproveRepository aprRepo = new ApproveRepository();
        // GET: Approve
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorization(Roles = "Approve")]
        public ActionResult Approve()
        {
            //if (!WebSecurity.IsAuthenticated)

            //{

            //    Response.Redirect("~/Account/Login");

            //}

            return View();
        }

        
        #region GET
        public ActionResult GetUnapprovedProducts()
        {
            var res = new JsonResult();
           
                var productList =  aprRepo.GetUnapprovedProducts();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    productList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
           
           
            return res;
        }
        public ActionResult GetAssociatedProducts(string itemNo)
        {
            var res = new JsonResult();

            var productList = aprRepo.GetAssociatedProduct(itemNo);

            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                productList
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;


            return res;
        }
        
        #endregion GET

        #region SAVE
         public ActionResult ApproveProduct(string productId, string isStbChannel, string isStbWebsite, string userId)
        {
            var res = new JsonResult();
          
           string  result = aprRepo.ApproveProduct(productId, isStbChannel, isStbWebsite, userId);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
          
            return res;
        }
        public ActionResult DisapproveProduct(string productId, string disReason, string userId)
        {
            var res = new JsonResult();

            string result = aprRepo.DisapproveProduct(productId ,disReason, userId);

            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                result
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return res;
        }
        #endregion SAVE
    }
}