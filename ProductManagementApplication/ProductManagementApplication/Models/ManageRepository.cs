using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProductManagementApplication.Models;
using ProductManagementApplication.Models.DTO;
using WebMatrix.WebData;

namespace ProductManagementApplication.Models
{
    public class ManageRepository
    {
        //   private database1 db = new database1();
        // private database2 dbAM = new database2();
        private ErrorTracer error = new ErrorTracer();
        private MailRepository mail = new MailRepository();
        private ApproveRepository apprepo = new ApproveRepository();
        private MockDBTables mockDB = new MockDBTables();
        public List<ProductDTO> GetProductIdList()
        {
            List<ProductDTO> productList = new List<ProductDTO>();
            try
            {
                var products = (from p in mockDB.Products select p).ToList();
                var supplierList = (from s in mockDB.Suppliers select s).ToList();
                var classList = (from c in mockDB.ClassHierarchies select c).ToList();
                var uomList = (from u in mockDB.UnitOfMeasureCategories select u).ToList();
                var typeList = (from t in mockDB.ictypes select t).ToList();

                foreach (var prd in products)
                {
                    ProductDTO pdt = new ProductDTO();
                    pdt.ProductId = prd.ProductId;
                    pdt.ProductSku = prd.ProductSku;
                    pdt.ProductDescription = prd.ProductDescription;
                    var manufacturer = supplierList.Where(x => x.SupplierId == prd.SupplierId).Select(y => y.SupplierDescription).FirstOrDefault();
                    pdt.SupplierDescription = manufacturer != null ? manufacturer : "";
                    pdt.SupplierId = Convert.ToInt32(prd.SupplierId);
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
                    pdt.TypeDescription = prd.TypeId != null ? typeList.Where(x => x.ctype.Contains(prd.TypeId)).Select(y => y.ctypedesc).FirstOrDefault() : "";
                    pdt.TypeDescription = pdt.TypeDescription == null ? "" : pdt.TypeDescription;
                    pdt.TypeId = prd.TypeId != null ? prd.TypeId.ToString() : "";
                    pdt.UPC = prd.UPC == "" && Convert.ToBoolean(prd.NoUPCFound) ? "No UPC Found" : prd.UPC;
                    pdt.NoUPCFound = Convert.ToBoolean(prd.NoUPCFound);
                    pdt.VendorId = prd.VendorId;
                    pdt.VendorPartNo = prd.VendorPartNo;
                    pdt.Cost = Convert.ToDecimal(prd.Cost);
                    var uomWt = uomList.Where(x => x.UOMCategoryId == prd.WeightUOMId).Select(y => y.UOMCode).FirstOrDefault();
                    pdt.Weight = Convert.ToDecimal(prd.Weight);
                    pdt.WeightUOMId = Convert.ToInt32(prd.WeightUOMId);
                    pdt.WeightCombo = uomWt;

                    var uomLg = uomList.Where(x => x.UOMCategoryId == prd.LengthUOMId).Select(y => y.UOMCode).FirstOrDefault();
                    pdt.Length = Convert.ToDecimal(prd.Length);
                    pdt.LengthUOMId = Convert.ToInt32(prd.LengthUOMId);
                    pdt.LengthCombo = uomLg;

                    var uomWd = uomList.Where(x => x.UOMCategoryId == prd.WidthUOMId).Select(y => y.UOMCode).FirstOrDefault();
                    pdt.WidthCombo = uomWd;//Convert.ToDecimal(prd.Width).ToString().TrimEnd('0').TrimEnd('.') + " " +
                    pdt.Width = Convert.ToDecimal(prd.Width);
                    pdt.WidthUOMId = Convert.ToInt32(prd.WidthUOMId);

                    var uomHt = uomList.Where(x => x.UOMCategoryId == prd.HeightUOMId).Select(y => y.UOMCode).FirstOrDefault();
                    pdt.HeightCombo = uomHt;
                    pdt.Height = Convert.ToDecimal(prd.Height);
                    pdt.HeightUOMId = Convert.ToInt32(prd.HeightUOMId);

                    pdt.IsOneTime = Convert.ToBoolean(prd.IsOneTimeProduct);
                    pdt.IsSuitableChannels = Convert.ToBoolean(prd.IsSuitableChannels);
                    pdt.IsSuitableWeb = Convert.ToBoolean(prd.IsSuitableWeb);
                    pdt.DateCreated = Convert.ToDateTime(prd.DateTimeCreated).ToString("MM/dd/yyyy");
                    pdt.CreatedBy = prd.CreatedBy;
                    pdt.AssociatedProduct = apprepo.GetAssociatedProduct(prd.ProductSku);

                    productList.Add(pdt);

                }
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetProductIdList", ex.Message, WebSecurity.CurrentUserName, "Manage");
            }
            return productList.OrderBy(x => x.ProductSku).ToList();
        }
        public string SaveProducts(Product product)
        {
            var result = "success";
            try
            {
                var oldProduct = (from p in mockDB.Products where p.ProductId == product.ProductId select p).FirstOrDefault();

                oldProduct.SupplierId = product.SupplierId;
                oldProduct.BrandId = product.BrandId;

                if (product.BrandId == 0)
                {
                    //new brand add it to the table
                    Brand brd = new Brand();
                    brd.BrandDescription = product.Brand;
                    brd.IsVoided = false;
                    mockDB.Brands.Add(brd);
                    mockDB.SaveChanges();
                    product.BrandId = Convert.ToInt32(brd.BrandId);
                }
                oldProduct.BrandId = product.BrandId;
                oldProduct.Brand = product.Brand;
                oldProduct.ClassId1 = product.ClassId1;
                oldProduct.ClassId2 = product.ClassId2;
                oldProduct.ClassId3 = product.ClassId3;
                oldProduct.TypeId = product.TypeId;
                oldProduct.UPC = product.UPC;
                oldProduct.NoUPCFound = product.NoUPCFound;
                oldProduct.VendorId = product.VendorId;
                oldProduct.VendorPartNo = product.VendorPartNo;
                oldProduct.Cost = product.Cost;
                oldProduct.Weight = product.Weight;
                oldProduct.WeightUOMId = product.WeightUOMId;
                oldProduct.Length = product.Length;
                oldProduct.LengthUOMId = product.LengthUOMId;
                oldProduct.Width = product.Width;
                oldProduct.WidthUOMId = product.WidthUOMId;
                oldProduct.Height = product.Height;
                oldProduct.HeightUOMId = product.HeightUOMId;
                oldProduct.IsOneTimeProduct = product.IsOneTimeProduct;
                oldProduct.IsSuitableChannels = product.IsSuitableChannels;
                oldProduct.IsSuitableWeb = product.IsSuitableWeb;

                oldProduct.IsApproved = false;
                oldProduct.IsVoided = false;
                oldProduct.DateTimeUpdated = DateTime.Now;
                oldProduct.UpdatedBy = product.UpdatedBy;

                mockDB.SaveChanges();

            }
            catch (Exception ex)
            {
                result = "Error " + ex.Message;
                error.LogSystemError("SaveProducts", ex.Message, WebSecurity.CurrentUserName, "Manage");
            }
            return result;

        }
    }
}