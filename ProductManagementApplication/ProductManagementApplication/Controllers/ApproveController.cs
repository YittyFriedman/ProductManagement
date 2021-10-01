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

        // [CustomAuthorization(Roles = "Approve")]
        public ActionResult Approve()
        {
            //if (!WebSecurity.IsAuthenticated)

            //{

            //    Response.Redirect("~/Account/Login");

            //}

            return View();
        }


        #region GET
        /// <summary>
        /// function to get list of all unapproved products
        /// </summary>
        /// <returns></returns>
        public ActionResult GetUnapprovedProducts()
        {
            var res = new JsonResult();

            var productList = aprRepo.GetUnapprovedProducts();

            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                productList
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;


            return res;
        }
        /// <summary>
        /// function to get the old product which was associated with the new product 
        /// </summary>
        /// <param name="itemNo"></param>
        /// <returns></returns>
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
        /// <summary>
        /// function to approve the new product and enter it into the system
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="isStbChannel"></param>
        /// <param name="isStbWebsite"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public ActionResult ApproveProduct(string productId, string isStbChannel, string isStbWebsite, string userId)
        {
            var res = new JsonResult();

            string result = aprRepo.ApproveProduct(productId, isStbChannel, isStbWebsite, userId);

            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                result
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return res;
        }
        /// <summary>
        /// function to disapprove the new product which will notify the created that item was disapproved and needs to be modified
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="disReason"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public ActionResult DisapproveProduct(string productId, string disReason, string userId)
        {
            var res = new JsonResult();

            string result = aprRepo.DisapproveProduct(productId, disReason, userId);

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