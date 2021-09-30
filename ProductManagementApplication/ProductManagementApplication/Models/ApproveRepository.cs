using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProductManagementApplication.Models.DTO;
using WebMatrix.WebData;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace ProductManagementApplication.Models
{
    public class ApproveRepository
    {
        private ProductManagementEntities db = new ProductManagementEntities();
        private ProductManagementSecurityEntities dbs = new ProductManagementSecurityEntities();
        private sample999Entities dbAM = new sample999Entities();
        private ErrorTracer error = new ErrorTracer();
        private MailRepository mail = new MailRepository();
        public List<ProductDTO> GetUnapprovedProducts()
        {
            List<ProductDTO> productList = new List<ProductDTO>();
            try
            {
                var products = new List<Product>();

                var roleId = (from u in dbs.webpages_Roles where u.RoleName == "ApproveChicago" select u.RoleId).FirstOrDefault();
                var userIdList = (from r in dbs.webpages_UsersInRoles where r.RoleId == roleId select r.UserId).ToList();
                var userList = (from e in dbs.Users where userIdList.Contains(e.UserId) select e.UserName).ToList();

                if (userList.Contains(WebSecurity.CurrentUserName))
                {
                    products = (from p in db.Products where p.IsApproved != true && p.IsVoided != true && userList.Contains( p.CreatedBy) select p).OrderByDescending(x => x.DateTimeCreated).ToList();

                }

                else
                {
                    products = (from p in db.Products where p.IsApproved != true && p.IsVoided != true select p).OrderByDescending(x => x.DateTimeCreated).ToList();
                }
                foreach (var prd in products)
                {
                   
                    productList.Add(FormatProduct( prd));

                }
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        //result = "error: " + message;
                    }
                }

            }
            catch (Exception ex)
            {
                //var error = ex.Message;
                error.LogSystemError("GetUnapprovedProducts", ex.Message, WebSecurity.CurrentUserName, "Approve");
            }
            return productList.ToList();
        }

        public string ApproveProduct(string productId, string isStbChannel, string isStbWebsite, string userId)
        {
            var result = "success";
            try
            {
                Int64 prdId = Convert.ToInt64(productId);
                var product = (from p in db.Products where p.ProductId == prdId select p).FirstOrDefault();
                if (product != null)
                { 

                    var amResult = SaveAMProduct(product, isStbChannel, isStbWebsite, userId);
                    if (amResult == "Success")
                    {
                        product.IsApproved = true;
                        product.ApprovedBy = userId;
                        db.SaveChanges();

                        string msg = "The new product you created was approved and entered into AM."
                                   + "<br>"
                                   + "<p><strong>Product SKU:</strong> " + product.ProductSku + "</p>"
                                   + "<p><strong>Product Description:</strong> " + product.ProductDescription + "</p>"
                                   + "<p><strong>Created By:</strong> " + product.CreatedBy + "</p>"
                                   + "<p><strong>Date Created:</strong> " + Convert.ToDateTime(product.DateTimeCreated).ToString("MM/dd/yyyy") + "</p>"
                                   + "<p><strong>Approved By:</strong> " + userId + "</p>";

                        List<string> toList = new List<string>();
                        toList.Add(product.CreatedBy);
                        toList.Add(userId);
                        var mailResult = mail.SendEmail("Approved Product", msg, toList);
                    }
                    else
                    {
                        result = "Product was not saved. " + amResult;
                    }

                }
                else
                {
                    result = "Product was not saved. ";
                }

            }
            catch (Exception ex)
            {
                result = "error: " + ex.Message;
                error.LogSystemError("ApproveProduct", ex.Message, WebSecurity.CurrentUserName, "Approve");
            }
            return result;
        }

        public string SaveAMProduct(Product product, string isStbChannel, string isStbWebsite, string userId)
        {
            string result = "Success";
            try
            {
                icitem AMItem = new icitem();

                var amExisitingItem = (from i in dbAM.icitems where i.citemno == product.ProductSku select i).FirstOrDefault();
                if (amExisitingItem != null)//item allready exists so just update item.
                {
                                var type = (from t in dbAM.ictypes where t.ctype == product.TypeId select t).FirstOrDefault();
                    if (type != null)
                    {



                        amExisitingItem.ctype = type.ctype;
                        amExisitingItem.cclass = type.cclass;
                        amExisitingItem.cprodline = type.cprodline;
                        amExisitingItem.cmeasure = type.cmeasure;
                        amExisitingItem.csmeasure = type.csmeasure;
                        amExisitingItem.cpmeasure = type.cpmeasure;
                        amExisitingItem.cstatus = type.cstatus;
                        amExisitingItem.ccommiss = type.ccommiss;
                        amExisitingItem.ctaxcode = type.ctaxcode;
                        amExisitingItem.nprice = type.nprice;
                        amExisitingItem.nprcinctx = type.nprcinctx;
                        amExisitingItem.ndiscrate = type.ndiscrate;
                        amExisitingItem.nweight = type.nweight;
                        amExisitingItem.nstdcost = type.nstdcost;
                        amExisitingItem.nrtrncost = type.nrtrncost;
                        amExisitingItem.laritem = type.laritem;
                        amExisitingItem.lpoitem = type.lpoitem;
                        amExisitingItem.lmiitem = type.lmiitem;
                        amExisitingItem.lowivrmk = type.lowivrmk;
                        amExisitingItem.lowsormk = type.lowsormk;
                        amExisitingItem.lowpormk = type.lowpormk;
                        amExisitingItem.lowmirmk = type.lowmirmk;
                        amExisitingItem.lptivrmk = type.lptivrmk;
                        amExisitingItem.lptarpsrmk = type.lptarpsrmk;
                        amExisitingItem.lptsormk = type.lptsormk;
                        amExisitingItem.lptsoplrmk = type.lptsoplrmk;
                        amExisitingItem.lptsopsrmk = type.lptsopsrmk;
                        amExisitingItem.lptpormk = type.lptpormk;
                        amExisitingItem.lptmirmk = type.lptmirmk;
                        amExisitingItem.lowrarmk = type.lowrarmk;
                        amExisitingItem.lptrarmk = type.lptrarmk;
                        amExisitingItem.lptraplrmk = type.lptraplrmk;
                        amExisitingItem.ltaxable1 = type.ltaxable1;
                        amExisitingItem.ltaxable2 = type.ltaxable2;
                        amExisitingItem.lallownupd = type.lallownupd;
                        amExisitingItem.lnegprice = type.lnegprice;
                        amExisitingItem.lowdesc = type.lowdesc;
                        amExisitingItem.lowweight = type.lowweight;
                        amExisitingItem.lowprice = type.lowprice;
                        amExisitingItem.lowdisc = type.lowdisc;
                        amExisitingItem.lowrevncd = type.lowrevncd;
                        amExisitingItem.lowcoms = type.lowcoms;
                        amExisitingItem.lowtax = type.lowtax;
                        amExisitingItem.ldiscard = type.ldiscard;
                        amExisitingItem.lrepair = type.lrepair;
                        amExisitingItem.nrstkpct = type.nrstkpct;
                        amExisitingItem.nminrstk = type.nminrstk;
                        amExisitingItem.nrepprice = type.nrepprice;
                        amExisitingItem.lprtsn = type.lprtsn;
                    
                        amExisitingItem.dcreate = DateTime.Now.Date;


                   //     amExisitingItem.citemno = product.ProductSku;
                        amExisitingItem.cdescript = product.ProductDescription;
                        amExisitingItem.ctype = product.TypeId;
                        amExisitingItem.cstatus = "A";
                        var uom = GetAMUOM(Convert.ToInt16(product.UnitOfMeasureId));
                        amExisitingItem.cmeasure = uom;
                        amExisitingItem.csmeasure = uom;
                        amExisitingItem.cpmeasure = uom;
                        amExisitingItem.cDataScr = "WEBIM";
                        amExisitingItem.cfdescript = "";
                        amExisitingItem.cspectype1 = "";
                        amExisitingItem.cspectype2 = "";
                        amExisitingItem.cbarcode1 = product.UPC;
                        amExisitingItem.cbarcode2 = "";
                        amExisitingItem.cclass = "ME";
                        amExisitingItem.nCatgryId1 = product.ClassId1;
                        amExisitingItem.nCatgryId2 = product.ClassId2;
                        amExisitingItem.nCatgryId3 = product.ClassId3;
                        amExisitingItem.cprodline = "";
                        amExisitingItem.ccommiss = "";
                        amExisitingItem.cvendno = product.VendorId;
                        amExisitingItem.cBrand = product.Brand;
                        amExisitingItem.cminptype = "";
                        amExisitingItem.cbuyer = "";
                        amExisitingItem.ctaxcode = "";
                        amExisitingItem.nweight = Convert.ToDecimal(product.Weight);
                        amExisitingItem.nLength = Convert.ToDecimal(product.Length);
                        amExisitingItem.nWidth = Convert.ToDecimal(product.Width);
                        amExisitingItem.nHeight = Convert.ToDecimal(product.Height);
                        amExisitingItem.nstdcost = Convert.ToDecimal(product.Cost);
                        amExisitingItem.lOneTime = Convert.ToInt16(product.IsOneTimeProduct);
                        amExisitingItem.lNoUPC = Convert.ToInt16(product.NoUPCFound);
                        amExisitingItem.lSuitChanl = Convert.ToInt16(Convert.ToBoolean(isStbChannel));
                        amExisitingItem.lSuitWeb = Convert.ToInt16(Convert.ToBoolean(isStbWebsite));
                     
                        amExisitingItem.cCreatedby = product.CreatedBy;
                        amExisitingItem.cApprovdby = userId;
                        dbAM.SaveChanges();


                        if (product.VendorId != "" && product.VendorId != null)
                        {
                            var sameVendorRecord = (from r in dbAM.icvends where r.citemno == product.ProductSku && r.cvendno == product.VendorId && product.VendorPartNo == r.cpartno && r.cmeasure == uom select r).FirstOrDefault();
                            if (sameVendorRecord == null)
                            {

                                var existingVendorRecord = (from r in dbAM.icvends where r.citemno == product.ProductSku && r.ldefault == 1 select r).FirstOrDefault();
                                if (existingVendorRecord != null)
                                {
                                    existingVendorRecord.ldefault = 0;
                                    dbAM.SaveChanges();
                                }
                                var vendorRecord = (from v in db.Vendors where v.VendorNo == product.VendorId select v);

                            icvend vendor = new icvend();
                            vendor.citemno = product.ProductSku; //icitem.citemno
                            vendor.cvendno = product.VendorId; //AM VendNo
                            vendor.cdescript = product.ProductDescription;
                            vendor.cmeasure = uom;// icitem.cmeasure
                            vendor.cpartno = product.VendorPartNo;
                            // vendor.dasof = DateTime.Now.Date;
                            vendor.ldefault = 1;
                            vendor.nvendltime = 0;
                            vendor.ncost = Convert.ToDecimal(product.Cost);//icitem.nstdcost
                            vendor.nlastcost = 0;
                            vendor.nvndwarprd = 0;
                            vendor.nNoItemOnPallet = 0;
                            vendor.cWareHouse = "";
                            // vendor.cOldUoM = uom;
                            // vendor.oldLast = Convert.ToDecimal(product.Cost);
                            // vendor.dLastPo = ??;
                            // vendor.dLastGR = ??;
                            dbAM.icvends.Add(vendor);
                            dbAM.SaveChanges();  
                                
                               
                            }
                              
                        }
                       
                        
                        //commenting out ass product since it cant be modified in manage tab for now
                        //var assPrd = (from p in db.ProductMappings where p.NewProductId == product.ProductSku select p).FirstOrDefault();
                        //if (assPrd != null)
                        //{

                    
                        //    icitem_map itemMap = new icitem_map();
                        //    itemMap.cItemno = assPrd.NewProductId;
                        //    itemMap.cOldItemno = assPrd.OldProductId;
                        //    itemMap.nId = assPrd.ProductMappingId;

                        //    dbAM.icitem_map.Add(itemMap);
                        //    dbAM.SaveChanges();

                        //    DeactivateOldItem(itemMap.cOldItemno);
                        //}    
                      
                    }

                }
                else //add new item to AM
                {


                    var type = (from t in dbAM.ictypes where t.ctype == product.TypeId select t).FirstOrDefault();
                    if (type != null)
                    {



                        AMItem.ctype = type.ctype;
                        AMItem.cclass = type.cclass;
                        AMItem.cprodline = type.cprodline;
                        AMItem.cmeasure = type.cmeasure;
                        AMItem.csmeasure = type.csmeasure;
                        AMItem.cpmeasure = type.cpmeasure;
                        AMItem.cstatus = type.cstatus;
                        AMItem.ccommiss = type.ccommiss;
                        AMItem.ctaxcode = type.ctaxcode;
                        AMItem.nprice = type.nprice;
                        AMItem.nprcinctx = type.nprcinctx;
                        AMItem.ndiscrate = type.ndiscrate;
                        AMItem.nweight = type.nweight;
                        AMItem.nstdcost = type.nstdcost;
                        AMItem.nrtrncost = type.nrtrncost;
                        AMItem.laritem = type.laritem;
                        AMItem.lpoitem = type.lpoitem;
                        AMItem.lmiitem = type.lmiitem;
                        AMItem.lowivrmk = type.lowivrmk;
                        AMItem.lowsormk = type.lowsormk;
                        AMItem.lowpormk = type.lowpormk;
                        AMItem.lowmirmk = type.lowmirmk;
                        AMItem.lptivrmk = type.lptivrmk;
                        AMItem.lptarpsrmk = type.lptarpsrmk;
                        AMItem.lptsormk = type.lptsormk;
                        AMItem.lptsoplrmk = type.lptsoplrmk;
                        AMItem.lptsopsrmk = type.lptsopsrmk;
                        AMItem.lptpormk = type.lptpormk;
                        AMItem.lptmirmk = type.lptmirmk;
                        AMItem.lowrarmk = type.lowrarmk;
                        AMItem.lptrarmk = type.lptrarmk;
                        AMItem.lptraplrmk = type.lptraplrmk;
                        AMItem.ltaxable1 = type.ltaxable1;
                        AMItem.ltaxable2 = type.ltaxable2;
                        AMItem.lallownupd = type.lallownupd;
                        AMItem.lnegprice = type.lnegprice;
                        AMItem.lowdesc = type.lowdesc;
                        AMItem.lowweight = type.lowweight;
                        AMItem.lowprice = type.lowprice;
                        AMItem.lowdisc = type.lowdisc;
                        AMItem.lowrevncd = type.lowrevncd;
                        AMItem.lowcoms = type.lowcoms;
                        AMItem.lowtax = type.lowtax;
                        AMItem.ldiscard = type.ldiscard;
                        AMItem.lrepair = type.lrepair;
                        AMItem.nrstkpct = type.nrstkpct;
                        AMItem.nminrstk = type.nminrstk;
                        AMItem.nrepprice = type.nrepprice;
                        AMItem.lprtsn = type.lprtsn;



                        AMItem.cfdescript = "";
                        AMItem.lkititem = 0;
                        AMItem.lprebkit = 0;
                        AMItem.lusekitno = 0;
                        AMItem.lowcomp = 0;
                        AMItem.llot = 0;
                        AMItem.lprtsn = 0;
                        AMItem.lusespec = 0;
                       
                        AMItem.lallownupd = 1;
                        AMItem.nqtydec = 2;
                        AMItem.ncosttype = 1;
                        AMItem.dcreate = DateTime.Now.Date;
                        AMItem.cminptype = "PC";
                        AMItem.laritem = 1;
                        AMItem.lpoitem = 1;
                        AMItem.lmiitem = 1;
                        AMItem.nminprice = 0;
                        AMItem.lchkonhand = 0;
                        AMItem.lowdesc = 1;
                        AMItem.lupdonhand = 1;
                        AMItem.ltaxable1 = 1;
                        AMItem.lowprice = 1;
                        AMItem.lallowneg = 1;
                        AMItem.lnegprice = 1;
                        AMItem.lowdisc = 1;
                        AMItem.lowtax = 1;
                        AMItem.lowweight = 1;
                        AMItem.cLowTaxCdIL = "CH";
                        AMItem.lptpormk = 1;
                        AMItem.lShipFrStk = 0;
                        AMItem.lTAXAL = 1;
                        AMItem.lTAXAR = 1;
                        AMItem.lTAXAK = 1;
                        AMItem.lTAXAZ = 1;
                        AMItem.lTAXCA = 1;
                        AMItem.lTAXCO = 1;
                        AMItem.lTAXCT = 1;
                        AMItem.lTAXDE = 1;
                        AMItem.lTAXDC = 1;
                        AMItem.lTAXFL = 1;
                        AMItem.lTAXGA = 1;
                        AMItem.lTAXHI = 1;
                        AMItem.lTAXID = 1;
                        AMItem.lTAXIL = 1;
                        AMItem.lTAXIN = 1;
                        AMItem.lTAXIA = 1;
                        AMItem.lTAXKS = 1;
                        AMItem.lTAXKY = 1;
                        AMItem.lTAXLA = 1;
                        AMItem.lTAXME = 1;
                        AMItem.lTAXMD = 1;
                        AMItem.lTAXMA = 1;
                        AMItem.lTAXMI = 1;
                        AMItem.lTAXMN = 1;
                        AMItem.lTAXMS = 1;
                        AMItem.lTAXMO = 1;
                        AMItem.lTAXMT = 1;
                        AMItem.lTAXNE = 1;
                        AMItem.lTAXNV = 1;
                        AMItem.lTAXNH = 1;
                        AMItem.lTAXNJ = 1;
                        AMItem.lTAXNM = 1;
                        AMItem.lTAXNY = 1;
                        AMItem.lTAXNC = 1;
                        AMItem.lTAXND = 1;
                        AMItem.lTAXOH = 1;
                        AMItem.lTAXOK = 1;
                        AMItem.lTAXOR = 1;
                        AMItem.lTAXPA = 1;
                        AMItem.lTAXRI = 1;
                        AMItem.lTAXSC = 1;
                        AMItem.lTAXSD = 1;
                        AMItem.lTAXTN = 1;
                        AMItem.lTAXTX = 1;
                        AMItem.lTAXUT = 1;
                        AMItem.lTAXVT = 1;
                        AMItem.lTAXVI = 1;
                        AMItem.lTAXWA = 1;
                        AMItem.lTAXWV = 1;
                        AMItem.lTAXWI = 1;
                        AMItem.lTAXWY = 1;
                        AMItem.lTAXPR = 1;
                        AMItem.lTAXVA = 1;







                        AMItem.citemno = product.ProductSku;
                        AMItem.cdescript = product.ProductDescription;
                        AMItem.ctype = product.TypeId;
                        AMItem.cstatus = "A";
                        var uom = GetAMUOM(Convert.ToInt16(product.UnitOfMeasureId));
                        AMItem.cmeasure = uom;
                        AMItem.csmeasure = uom;
                        AMItem.cpmeasure = uom;
                        AMItem.cDataScr = "WEBIM";
                        AMItem.cfdescript = "";
                        AMItem.cspectype1 = "";
                        AMItem.cspectype2 = "";
                        AMItem.cbarcode1 = product.UPC;
                        AMItem.cbarcode2 = "";
                        AMItem.cclass = "ME";
                        AMItem.nCatgryId1 = product.ClassId1;
                        AMItem.nCatgryId2 = product.ClassId2;
                        AMItem.nCatgryId3 = product.ClassId3;
                        AMItem.cprodline = "";
                        AMItem.ccommiss = "";
                        AMItem.cvendno = product.VendorId;
                        AMItem.cBrand = product.Brand;
                        AMItem.cminptype = "";
                        AMItem.cbuyer = "";
                        AMItem.ctaxcode = "";
                        AMItem.nweight = Convert.ToDecimal(product.Weight);
                        AMItem.nLength = Convert.ToDecimal(product.Length);
                        AMItem.nWidth = Convert.ToDecimal(product.Width);
                        AMItem.nHeight = Convert.ToDecimal(product.Height);
                        AMItem.nstdcost = Convert.ToDecimal(product.Cost);
                        AMItem.lOneTime = Convert.ToInt16(product.IsOneTimeProduct);
                        AMItem.lNoUPC = Convert.ToInt16(product.NoUPCFound);
                        AMItem.lSuitChanl = Convert.ToInt16(Convert.ToBoolean(isStbChannel));
                        AMItem.lSuitWeb = Convert.ToInt16(Convert.ToBoolean(isStbWebsite));
                   
                        AMItem.cCreatedby = product.CreatedBy;
                        AMItem.cApprovdby = userId;

                        dbAM.icitems.Add(AMItem);
                        dbAM.SaveChanges();

                        if (product.VendorId != "" && product.VendorId != null)
                        {
                            var vendorRecord = (from v in db.Vendors where v.VendorNo == product.VendorId select v);

                            icvend vendor = new icvend();
                            vendor.citemno = product.ProductSku; //icitem.citemno
                            vendor.cvendno = product.VendorId; //AM VendNo
                            vendor.cdescript = product.ProductDescription;
                            vendor.cmeasure = uom;// icitem.cmeasure
                            vendor.cpartno = product.VendorPartNo;
                            // vendor.dasof = DateTime.Now.Date;
                            vendor.ldefault = 1;
                            vendor.nvendltime = 0;
                            vendor.ncost = Convert.ToDecimal(product.Cost);//icitem.nstdcost
                            vendor.nlastcost = 0;
                            vendor.nvndwarprd = 0;
                            vendor.nNoItemOnPallet = 0;
                            vendor.cWareHouse = "";
                            // vendor.cOldUoM = uom;
                            // vendor.oldLast = Convert.ToDecimal(product.Cost);
                            // vendor.dLastPo = ??;
                            // vendor.dLastGR = ??;
                            dbAM.icvends.Add(vendor);
                            dbAM.SaveChanges();
                        }
                        var assPrd = (from p in db.ProductMappings where p.NewProductId == product.ProductSku select p).FirstOrDefault();
                        if (assPrd != null)
                        {


                            icitem_map itemMap = new icitem_map();
                            itemMap.cItemno = assPrd.NewProductId;
                            itemMap.cOldItemno = assPrd.OldProductId;
                            itemMap.nId = assPrd.ProductMappingId;

                            dbAM.icitem_map.Add(itemMap);
                            dbAM.SaveChanges();

                            DeactivateOldItem(itemMap.cOldItemno);
                        }

                    }


                    else
                {
                    result = "No Type found";
                }    }
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        result = "error: " + message;
                    }
                }

            }
            catch (Exception ex)
            {
                result = "error: " + ex.Message;
                error.LogSystemError("SaveAMProduct", ex.Message, WebSecurity.CurrentUserName, "Approve");
            }
            return result;
        }

        public ProductDTO FormatProduct(Product prd)
        {
                  ProductDTO pdt = new ProductDTO();  
            try
            {
                var supplierList = (from s in db.Suppliers select s).ToList();
                var classList = (from c in db.ClassHierarchies select c).ToList();
                var uomList = (from u in db.UnitOfMeasureCategories select u).ToList();
                var typeList = (from t in dbAM.ictypes where t.cstatus != "I" select t).ToList();

        
                pdt.ProductId = prd.ProductId;
                pdt.ProductSku = prd.ProductSku;
                pdt.ProductDescription = prd.ProductDescription;
                var manufacturer = supplierList.Where(x => x.SupplierId == prd.SupplierId).Select(y => y.SupplierDescription).FirstOrDefault();
                pdt.SupplierDescription = manufacturer != null ? manufacturer : "";
                pdt.SupplierId = Convert.ToInt32( prd.SupplierId);
                pdt.BrandDescription = prd.Brand;
                pdt.BrandId = Convert.ToInt32(prd.BrandId);
                pdt.ClassId1 = Convert.ToInt16(prd.ClassId1);
                var classRecord = classList.Where(x => x.ClassHierarchyRevNo == prd.ClassId1).FirstOrDefault();
                if (classRecord != null)
                {
                    pdt.ClassDescription1 = classRecord.Level4 != "" ? classRecord.Level4 : classRecord.Level3 != "" ? classRecord.Level3 : classRecord.Level2 != "" ? classRecord.Level2 : classRecord.Level1;
                }
                else
                {
                    pdt.ClassDescription1 = "";
                }
                if (prd.ClassId2 != null && prd.ClassId2 != 0)
                {
                    pdt.ClassId2 = Convert.ToInt16(prd.ClassId2);
                    var classRecord2 = classList.Where(x => x.ClassHierarchyRevNo == prd.ClassId2).FirstOrDefault();
                    if (classRecord2 != null)
                    {
                        pdt.ClassDescription2 = classRecord2.Level4 != "" ? classRecord2.Level4 : classRecord2.Level3 != "" ? classRecord2.Level3 : classRecord2.Level2 != "" ? classRecord2.Level2 : classRecord2.Level1;
                    }
                    else
                    {
                        pdt.ClassDescription2 = "";
                    }

                }
                else { pdt.ClassDescription2 = ""; }
                if (prd.ClassId3 != null && prd.ClassId3 != 0)
                {
                    pdt.ClassId3 = Convert.ToInt16(prd.ClassId3);
                    var classRecord3 = classList.Where(x => x.ClassHierarchyRevNo == prd.ClassId3).FirstOrDefault();
                    if (classRecord3 != null)
                    {
                        pdt.ClassDescription3 = classRecord3.Level4 != "" ? classRecord3.Level4 : classRecord3.Level3 != "" ? classRecord3.Level3 : classRecord3.Level2 != "" ? classRecord3.Level2 : classRecord3.Level1;
                    }
                    else
                    {
                        pdt.ClassDescription3 = "";
                    }

                }
                else
                {
                    pdt.ClassDescription3 = "";
                }
                pdt.TypeId = prd.TypeId;
                pdt.TypeDescription = prd.TypeId != null ? typeList.Where(x => x.ctype.Contains(prd.TypeId)).Select(y => y.ctypedesc).FirstOrDefault() : "";
                pdt.TypeDescription = pdt.TypeDescription == null ? "" : pdt.TypeDescription;
                pdt.UPC = prd.UPC == "" && Convert.ToBoolean(prd.NoUPCFound) ? "No UPC Found" : prd.UPC;
                pdt.NoUPCFound = Convert.ToBoolean( prd.NoUPCFound);
                pdt.VendorId = prd.VendorId == null ? "" : prd.VendorId;
                pdt.VendorPartNo = prd.VendorPartNo == null ? "" : prd.VendorPartNo;
                pdt.Cost = Convert.ToDecimal(prd.Cost);
                var uomWt = uomList.Where(x => x.UOMCategoryId == prd.WeightUOMId).Select(y => y.UOMCode).FirstOrDefault();
                pdt.WeightCombo = Convert.ToDecimal(prd.Weight).ToString().TrimEnd('0').TrimEnd('.') + " " + uomWt;
                pdt.WeightUOMId = Convert.ToInt32( prd.WeightUOMId);
                var uomLg = uomList.Where(x => x.UOMCategoryId == prd.LengthUOMId).Select(y => y.UOMCode).FirstOrDefault();
                pdt.LengthCombo = Convert.ToDecimal(prd.Length).ToString().TrimEnd('0').TrimEnd('.') + " " + uomLg;
                pdt.LengthUOMId = Convert.ToInt32(prd.LengthUOMId);
                var uomWd = uomList.Where(x => x.UOMCategoryId == prd.WidthUOMId).Select(y => y.UOMCode).FirstOrDefault();
                pdt.WidthCombo = Convert.ToDecimal(prd.Width).ToString().TrimEnd('0').TrimEnd('.') + " " + uomWd;
                pdt.WidthUOMId = Convert.ToInt32(prd.WidthUOMId);
                var uomHt = uomList.Where(x => x.UOMCategoryId == prd.HeightUOMId).Select(y => y.UOMCode).FirstOrDefault();
                pdt.HeightCombo = Convert.ToDecimal(prd.Height).ToString().TrimEnd('0').TrimEnd('.') + " " + uomHt;
                pdt.HeightUOMId = Convert.ToInt32(prd.HeightUOMId);
                pdt.IsOneTime = Convert.ToBoolean(prd.IsOneTimeProduct);
                pdt.IsSuitableChannels = Convert.ToBoolean(prd.IsSuitableChannels);
                pdt.IsSuitableWeb = Convert.ToBoolean(prd.IsSuitableWeb);
                pdt.DateCreated = Convert.ToDateTime(prd.DateTimeCreated).ToString("MM/dd/yyyy");
                pdt.CreatedBy = prd.CreatedBy;
                pdt.DateUpdated = prd.DateTimeUpdated != null ? Convert.ToDateTime(prd.DateTimeUpdated).ToString("MM/dd/yyyy") : "";
                pdt.UpdatedBy = prd.UpdatedBy != null ? prd.UpdatedBy : "";
                pdt.AssociatedProduct = GetAssociatedProduct(prd.ProductSku);
            }
            catch(Exception ex)
            {
             var mes=   ex.InnerException.Message;

            }
            return pdt;
        }
      public string  GetAssociatedProduct(string itemNo)
        {
            string associatedProduct = "";
            try {
                associatedProduct = (from p in db.ProductMappings where p.NewProductId == itemNo select p.OldProductId).FirstOrDefault();
                associatedProduct = associatedProduct == null ? "" : associatedProduct;
            }
            catch(Exception ex)
            {
               error.LogSystemError("GetAssociatedProduct", ex.Message, WebSecurity.CurrentUserName, "Approve");
            }
            return associatedProduct;
        }

        public string DisapproveProduct(string productId, string disapprovalReason, string userId)
        {
            var result = "success";
            try
            {
                Int64 prdId = Convert.ToInt64(productId);
                var product = (from p in db.Products where p.ProductId == prdId select p).FirstOrDefault();
                if (product != null)
                {
                    product.IsApproved = false;
                    product.IsVoided = true;
                    product.ApprovedBy = userId;
                    product.DisapprovalReason = disapprovalReason;
                    db.SaveChanges();

                    string msg = "The new product you created was not approved. Please make the changes requested in “Reason for Disapproval” in the Product Management > Manage Screen."
                                + "<br>"
                                + "<p><strong>Product SKU:</strong> " + product.ProductSku + "</p>"
                                + "<p><strong>Product Description:</strong> " + product.ProductDescription + "</p>"
                                + "<p><strong>Created By:</strong> " + product.CreatedBy + "</p>"
                                + "<p><strong>Date Created:</strong> " + Convert.ToDateTime(product.DateTimeCreated).ToString("MM/dd/yyyy") + "</p>"
                                + "<p><strong>Disapproved By:</strong> " + userId + "</p>"
                                + "<p><strong>Reason for Disapproval:</strong> " + disapprovalReason + " </p> ";
                    List<string> toList = new List<string>();
                    toList.Add(product.CreatedBy);
                    toList.Add(userId);
                    var mailResult = mail.SendEmail("Disapproved Product", msg, toList);
                }
                else
                {
                    result = "Error while disapproving product, contact admin.";
                }

            }
            catch (Exception ex)
            {
                result = "error: " + ex.Message;
                error.LogSystemError("DisapproveProduct", ex.Message, WebSecurity.CurrentUserName, "Approve");
            }
            return result;
        }
        public string GetAMUOM(int uomId)
        {
            var uom = (from u in db.UnitOfMeasures where u.UnitOfMeasureId == uomId select u).FirstOrDefault();
            string amCmsr = "";
            if (uom != null)
            {


                var amCode = uom.BaseCode + uom.Factor;
                var amUOM = (from a in dbAM.icunits where a.cmeasure.Contains(amCode) select a).FirstOrDefault();
                if (amUOM != null)
                {

              
                amCmsr = amUOM.cmeasure;
            }
                else//add new AM UOM
                {
                    icunit newUnit = new icunit();
                    newUnit.cmeasure = amCode;
                    newUnit.cdescript = uom.UnitOfMeasureDescription;
                    newUnit.csymbol = amCode;
                    newUnit.cfsymbol = "";
                    newUnit.cstatus = "A";
                    newUnit.ncnvqty = Convert.ToDecimal( uom.Factor);

                    dbAM.icunits.Add(newUnit);
                    db.SaveChanges();
                    amCmsr = newUnit.cmeasure;
                }
            }
            return amCmsr;

        }

        public void DeactivateOldItem(string itemNo)
        {
            try
            {
                var amItem = (from c in dbAM.icitems where c.citemno == itemNo select c).FirstOrDefault();
                amItem.cstatus = "I";
                dbAM.SaveChanges();
            }
            catch(Exception ex)
            {
                error.LogSystemError("DeactivateOldItem", ex.Message, WebSecurity.CurrentUserName, "Approve");

            }
        }
    }
}