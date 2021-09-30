using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMatrix.WebData;
using ProductManagementApplication.Models;
using ProductManagementApplication.Models.DTO;
using System.Net;
using System.Collections.Specialized;
using System.Web.Script.Serialization;


namespace ProductManagementApplication.Controllers
{
    public class AddController : Controller
    {
        private AddRepository addRepo = new AddRepository();
      //  private ProductManagementSecurityEntities dbs = new ProductManagementSecurityEntities();
        // GET: Add
        public ActionResult Index()
        {
          
            return View();
        }

        public ActionResult Add()
        {
            //if (!WebSecurity.IsAuthenticated)

            //{

            //    Response.Redirect("~/Account/Login");

            //}
            MockDBTables mockDB = new MockDBTables();
            mockDB.InitializeTables();
            return View();
        }

        #region GET
         public ActionResult GetAMProduct(string itemNo)
        {
            var res = new JsonResult();
            var amItem = addRepo.GetAMProduct(itemNo);

            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                amItem
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return res;
        }

        public ActionResult GetRefactorPermissions()
        {
            var res = new JsonResult();
            //     var roleId = (from r in dbs.webpages_Roles where r.RoleName == "Refactor" select r.RoleId).SingleOrDefault();
            //   var userRoleRecord = (from u in dbs.webpages_UsersInRoles where u.UserId == WebSecurity.CurrentUserId && u.RoleId == roleId select u).FirstOrDefault();
            //  var hasRefactorPermissions = userRoleRecord != null ? true: false;
            var hasRefactorPermissions = true;
            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                hasRefactorPermissions
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return res;
        }

        public ActionResult GetSiblingItems(string itemNo, string desc)
        {
            ///JavaScriptSerializer jss = new JavaScriptSerializer();
          //  icitem jssAMItem = jss.Deserialize<icitem>((string)amItem);
            var res = new JsonResult();
            var siblingList = addRepo.GetSiblingItems(itemNo, desc);

            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                siblingList
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return res;
        }
        public ActionResult GetSuppliers()
        {
            var res = new JsonResult();
              var supplierList = addRepo.GetSuppliers();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    supplierList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
          
            return res;
        }
         public ActionResult GetBrands()
        {
            var res = new JsonResult();
            var brandList = addRepo.GetBrands();

            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                brandList
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return res;
        }
        public ActionResult GetVendors()
        {
            var res = new JsonResult();
            var vendorList = addRepo.GetVendors();

            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                vendorList
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return res;
        }
        public ActionResult GetClasses()
        {
            var res = new JsonResult();
               var classList = addRepo.GetClasses();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    classList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
           
            return res;
        }

        
               public ActionResult GetTypes()
        {
            var res = new JsonResult();
           
                var typeList = addRepo.GetTypes();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    typeList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
           
            return res;
        }

        public ActionResult GetColors()
        {
            var res = new JsonResult();
            var colorList = addRepo.GetColors();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    colorList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
          
            return res;
        }

        public ActionResult GetSizes()
        {
            var res = new JsonResult();
             var sizeList = addRepo.GetSizes();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    sizeList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
           
            return res;
        }
        public ActionResult GetSizeTitles()
        {
            var res = new JsonResult();
           
                var sizeTitleList = addRepo.GetSizeTitles();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    sizeTitleList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
           
            return res;
        }
        public ActionResult GetOrientations()
        {
            var res = new JsonResult();
           
                var orientationList = addRepo.GetOrientations();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    orientationList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
           
            return res;
        }

        public ActionResult GetFlavors()
        {
            var res = new JsonResult();
          
                var flavorList = addRepo.GetFlavors();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    flavorList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
           
            return res;
        }

        public ActionResult GetPackagings()
        {
            var res = new JsonResult();
           
                var packagingList = addRepo.GetPackagings();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    packagingList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
         
            return res;
        }

        public ActionResult GetUOMs()
        {
            var res = new JsonResult();
              var uomList = addRepo.GetUOMs();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    uomList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
          
            return res;
        }

        public ActionResult GetStrengths()
        {
            var res = new JsonResult();
          
                var strengthList = addRepo.GetStrengths();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    strengthList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
           
            return res;
        }

        public ActionResult GetGenders()
        {
            var res = new JsonResult();
             var genderList = addRepo.GetGenders();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    genderList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
          
            return res;
        }

        public ActionResult GetOthers()
        {
            var res = new JsonResult();

            var otherList = addRepo.GetOthers();

            res.MaxJsonLength = int.MaxValue;
            res.Data = new
            {
                otherList
            };
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return res;
        }


        public ActionResult GenerateProductIds(string productData)
        {
            var res = new JsonResult();
             JavaScriptSerializer jss = new JavaScriptSerializer();
                ProductDTO jssProductData = jss.Deserialize<ProductDTO>((string)productData);
                var productList = addRepo.GenerateProductIds(jssProductData);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    productList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
           
          
            return res;
        
    }
         public ActionResult GetUOMCategories()
        {
            var res = new JsonResult();
        
                var uomList = addRepo.GetUOMCategories();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    uomList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
          
            return res;
        }

        
             public ActionResult GetUOMBases()
        {
            var res = new JsonResult();
             var uomList = addRepo.GetUOMBases();

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    uomList
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
          
            return res;
        }

        #endregion GET

        #region SAVE
        public ActionResult SaveNewSupplier(string newSupplierName)
        {
            var res = new JsonResult();
            var result = "success";
               addRepo.SaveNewSupplier(newSupplierName);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
           
            return res;
        }

        //public ActionResult SaveNewClass(string newClassName , string newClassCode)
        //{
        //    var res = new JsonResult();
        //    var result = "success";
        //    try
        //    {
        //        addRepo.SaveNewClass(newClassName, newClassCode);

        //        res.MaxJsonLength = int.MaxValue;
        //        res.Data = new
        //        {
        //            result
        //        };
        //        res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
        //    }
        //    catch (Exception ex)
        //    {
        //        result = "error " + ex.Message;
        //        res.MaxJsonLength = int.MaxValue;
        //        res.Data = new
        //        {
        //            result
        //        };
        //        res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
        //    }
        //    return res;
        //}

        public ActionResult SaveNewColor(string newColorName, string newColorCode)
        {
            var res = new JsonResult();
            var result = "Success";
            try
            {
              result =  addRepo.SaveNewColor(newColorName, newColorCode);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                result = "error " + ex.Message;
                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            return res;
        }

        public ActionResult SaveNewSize(string newSizeName, string newSizeCode, int newSizeTitleId)
        {
            var res = new JsonResult();
            var result = "success";
            try
            {
              result=  addRepo.SaveNewSize(newSizeName, newSizeCode, newSizeTitleId);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                result = "error " + ex.Message;
                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            return res;
        }

        public ActionResult SaveNewOrientation(string newOrientationName, string newOrientationCode)
        {
            var res = new JsonResult();
            var result = "success";
            try
            {
               result= addRepo.SaveNewOrientation(newOrientationName, newOrientationCode);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                result = "error " + ex.Message;
                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            return res;
        }

        public ActionResult SaveNewFlavor(string newFlavorName, string newFlavorCode)
        {
            var res = new JsonResult();
            var result = "success";
            try
            {
              result=  addRepo.SaveNewFlavor(newFlavorName, newFlavorCode);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                result = "error " + ex.Message;
                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            return res;
        }

        public ActionResult SaveNewPackaging(string newPackagingName, string newPackagingCode)
        {
            var res = new JsonResult();
            var result = "success";
            try
            {
               result= addRepo.SaveNewPackaging(newPackagingName, newPackagingCode);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                result = "error " + ex.Message;
                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            return res;
        }

        public ActionResult SaveNewUOM(string newUOMFactor, string newUOMBase, string newUOMCode)
        {
            var res = new JsonResult();
            var result = "success";
            try
            {
             result =   addRepo.SaveNewUOM(newUOMFactor, newUOMBase, newUOMCode);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                result = "error " + ex.Message;
                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            return res;
        }

        public ActionResult SaveNewStrength(string newStrengthName, string newStrengthCode)
        {
            var res = new JsonResult();
            var result = "success";
            try
            {
              result =  addRepo.SaveNewStrength(newStrengthName, newStrengthCode);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                result = "error " + ex.Message;
                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            return res;
        }

        public ActionResult SaveNewOther(string newOtherName, string newOtherCode)
        {
            var res = new JsonResult();
            var result = "success";
            try
            {
                result = addRepo.SaveNewOther(newOtherName, newOtherCode);

                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                result = "error " + ex.Message;
                res.MaxJsonLength = int.MaxValue;
                res.Data = new
                {
                    result
                };
                res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            return res;
        }
        public ActionResult SaveProducts(string productData)
        {
            var res = new JsonResult();
            try
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();
                List<Product> jssProductData = jss.Deserialize<List<Product>>((string)productData);
                var result = addRepo.SaveProducts(jssProductData);

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

        public ActionResult SaveItemMapping(string productMatchList)
        {
            var res = new JsonResult();
            try
            {
                JavaScriptSerializer jss = new JavaScriptSerializer();
                List<ProductMapping> jssProductData = jss.Deserialize<List<ProductMapping>>((string)productMatchList);
                var result = addRepo.SaveItemMapping(jssProductData);

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

        #endregion SAVE
    }
   
}