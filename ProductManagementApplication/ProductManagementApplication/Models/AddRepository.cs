using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProductManagementApplication.Models.DTO;
using System.Text.RegularExpressions;
using WebMatrix.WebData;
using System.Data.Entity.Validation;

namespace ProductManagementApplication.Models
{
    public class AddRepository
    {
     //   private database1 db = new database1();
       // private database2 dbAM = new database2();
        private ErrorTracer error = new ErrorTracer();
        private MockDBTables mockDB = new MockDBTables();

        /// <summary>
        /// function to check if item exists in old system
        /// </summary>
        /// <param name="itemNo"></param>
        /// <returns></returns>
        public icitem GetAMProduct(string itemNo)
        {

            icitem amItem = new icitem();
            try
            {
                amItem = (from a in mockDB.icitems where a.cstatus == "A" && a.citemno == itemNo select a).FirstOrDefault();

            }
            catch (Exception ex)
            {
                error.LogSystemError("GetAMProducts", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return amItem;
        }

        public List<icitem> GetSiblingItems(string itemNo, string desc)
        {

            List<icitem> amItemList = new List<icitem>();
            try
            {
                var searchItemChars = itemNo.Substring(0, 4);
                var searchDescChars = desc.Substring(0, 12);
                amItemList = (from a in mockDB.icitems 
                              join w in mockDB.iciwhs on a.citemno equals w.citemno
                              where 
                              a.cstatus == "A"
                              && a.cDataScr != "WEBIM" 
                              &&( a.citemno.Contains(searchItemChars) ||a.cdescript.Contains(searchDescChars))
                            && (w.cwarehouse =="5" || w.cwarehouse =="1")
                              select a).ToList();
                amItemList = amItemList.GroupBy(x => x.citemno).Select(x => x.First()).ToList();
                var thisItem =    amItemList.Where(x => x.citemno == itemNo).FirstOrDefault();
                 amItemList.Remove(thisItem);
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetSiblingItems", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return amItemList;
        }
        public List<SupplierDTO> GetSuppliers()
        {

            List<SupplierDTO> supplierList = new List<SupplierDTO>();
            try
            {
                var supplierdbList = (from s in mockDB.Suppliers where s.IsVoided != true select s).OrderBy(x => x.SupplierDescription).ToList();
                foreach (var sup in supplierdbList)
                {
                    SupplierDTO supplier = new SupplierDTO();
                    supplier.SupplierId = sup.SupplierId;
                    supplier.SupplierDescription = sup.SupplierDescription;
                    supplierList.Add(supplier);
                }
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetSuppliers", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return supplierList;
        }
        public List<BrandDTO> GetBrands()
        {

            List<BrandDTO> brandList = new List<BrandDTO>();
            try
            {
               
                var brandDb = (from b in mockDB.Brands where b.IsVoided != true select b).OrderBy(x => x.BrandDescription).ToList();
                foreach (var brnd in brandDb)
                {
                    BrandDTO brand = new BrandDTO();
                    brand.BrandId = Convert.ToInt32(brnd.BrandId);
                    brand.BrandDescription = brnd.BrandDescription;
                    brandList.Add(brand);
                }
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetBrands", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return brandList;
        }
        public List<Vendor> GetVendors()
        {

            List<Vendor> vendorList = new List<Vendor>();
            try
            {
                

                vendorList = (from v in mockDB.Vendors where v.IsVoid != true select v).OrderBy(x => x.VendorNo).ToList();

            }
            catch (Exception ex)
            {
                error.LogSystemError("GetVendors", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return vendorList;
        }
        public List<ClassHierarchyDTO> GetClasses()
        {
            List<ClassHierarchyDTO> classList = new List<ClassHierarchyDTO>();
            try
            {
        
           
                var classdbList = (from c in mockDB.ClassHierarchies where c.IsVoided != true select c).ToList();
                var level1List = classdbList.Select(x => x.Level1).Distinct().ToList();
                ClassHierarchyDTO chd = new ClassHierarchyDTO();
                chd.Description = "Select one";
                chd.RevNo = 0;
                // classList.Add(chd);
                foreach (var level1 in level1List)
                {
                    ClassHierarchyDTO chd1 = new ClassHierarchyDTO();
                    chd1.Description = level1;
                    var level2List = classdbList.Where(x => x.Level1 == level1).Select(y => y.Level2).Distinct().ToList();
                    foreach (var level2 in level2List)
                    {
                        if (level2 != "")
                        {

                            ClassHierarchyDTO chd2 = new ClassHierarchyDTO();
                            chd2.Description = level2;
                            var level3List = classdbList.Where(x => x.Level1 == level1 && x.Level2 == level2).Select(y => y.Level3).Distinct().ToList();
                            foreach (var level3 in level3List)
                            {
                                if (level3 != "")
                                {


                                    ClassHierarchyDTO chd3 = new ClassHierarchyDTO();
                                    chd3.Description = level3;

                                    var level4List = classdbList.Where(x => x.Level1 == level1 && x.Level2 == level2 && x.Level3 == level3).Select(y => y.Level4).Distinct().ToList();
                                    foreach (var level4 in level4List)
                                    {
                                        if (level4 != "")
                                        {
                                            ClassHierarchyDTO chd4 = new ClassHierarchyDTO();
                                            chd4.Description = level4;
                                            chd4.RevNo = Convert.ToInt64(classdbList.Where(x => x.Level1 == level1 && x.Level2 == level2 && x.Level3 == level3 && x.Level4 == level4).Select(y => y.ClassHierarchyRevNo).FirstOrDefault());
                                            chd3.ClassChildren.Add(chd4);

                                        }
                                        else
                                        {
                                            chd3.RevNo = Convert.ToInt64(classdbList.Where(x => x.Level1 == level1 && x.Level2 == level2 && x.Level3 == level3).Select(y => y.ClassHierarchyRevNo).FirstOrDefault());
                                        }

                                    }
                                    chd2.ClassChildren.Add(chd3);
                                }
                                else
                                {
                                    chd2.RevNo = Convert.ToInt64(classdbList.Where(x => x.Level1 == level1 && x.Level2 == level2).Select(y => y.ClassHierarchyRevNo).FirstOrDefault());
                                }
                            }
                            chd1.ClassChildren.Add(chd2);
                        }
                        else
                        {
                            chd1.RevNo = Convert.ToInt64(classdbList.Where(x => x.Level1 == level1).Select(y => y.ClassHierarchyRevNo).FirstOrDefault());
                        }
                    }
                    classList.Add(chd1);



                }
                var finalList = classList;
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetClasses", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return classList;
        }

        public List<ictype> GetTypes()
        {
            List<ictype> typeList = new List<ictype>();
            try
            {       

                typeList = (from t in mockDB.ictypes where t.cstatus == "A" select t).OrderBy(x => x.ctype).ToList();
            }
            catch (DbEntityValidationException ex)
            {
                error.LogSystemError("GetTypes", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return typeList;
        }


        public List<Color> GetColors()
        {
            List<Color> colorList = new List<Color>();
            try
            {
                       
                colorList = (from c in mockDB.Colors where c.IsVoided != true select c).OrderBy(x => x.ColorDescription).ToList();
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetColors", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return colorList;
        }

        public List<SizeHeaderDTO> GetSizes()
        {
            List<SizeHeaderDTO> sizeList = new List<SizeHeaderDTO>();
            try
            {
                    var generalSizeList = (from s in mockDB.Sizes where s.IsVoided != true select s).ToList();
                var sizeTitleList = (from t in mockDB.SizeTitles where t.IsVoided != true select t).ToList();
                var titles = generalSizeList.Select(x => x.SizeTitleId).Distinct().ToList();
                foreach (var title in titles)
                {
                    SizeHeaderDTO sizeTitle = new SizeHeaderDTO();
                    sizeTitle.SizeTitle = sizeTitleList.Where(x => x.SizeTitleId == title).Select(y => y.SizeTitleDescription).FirstOrDefault();
                    var dbSizeList = generalSizeList.Where(x => x.SizeTitleId == title).OrderBy(x => x.SizeDescription).ToList();
                    foreach (var size in dbSizeList)
                    {
                        SizeDetailDTO sizeDetail = new SizeDetailDTO();
                        sizeDetail.SizeId = size.SizeId;
                        sizeDetail.SizeDescription = size.SizeDescription;

                        sizeTitle.SizeList.Add(sizeDetail);
                    }
                    sizeList.Add(sizeTitle);
                }
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetSizes", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return sizeList;
        }

        public List<SizeHeaderDTO> GetSizeTitles()
        {
            List<SizeHeaderDTO> titleList = new List<SizeHeaderDTO>();
            try
            {
                 var dbTitleList = (from t in mockDB.SizeTitles where t.IsVoided != true select t).OrderBy(x => x.SizeTitleDescription).ToList();
                foreach (var title in dbTitleList)
                {
                    SizeHeaderDTO shd = new SizeHeaderDTO();
                    shd.SizeTitleId = title.SizeTitleId;
                    shd.SizeTitle = title.SizeTitleDescription;

                    titleList.Add(shd);
                }
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetSizeTitles", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return titleList;
        }

        public List<Orientation> GetOrientations()
        {
            List<Orientation> orientationList = new List<Orientation>();

            try
            {
              
                orientationList = (from o in mockDB.Orientations where o.IsVoided != true select o).OrderBy(x => x.OrientationDescription).ToList();
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetOrientations", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return orientationList;
        }

        public List<Flavor> GetFlavors()
        {
            List<Flavor> flavorList = new List<Flavor>();
            try
            {
            flavorList = (from f in mockDB.Flavors where f.IsVoided != true select f).OrderBy(x => x.FlavorDescription).ToList();
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetFlavors", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return flavorList;
        }
        public List<Packaging> GetPackagings()
        {
            List<Packaging> packagingList = new List<Packaging>();
            
            try
            {
           
                packagingList = (from p in mockDB.Packagings where p.IsVoided != true select p).OrderBy(x => x.PackagingDescription).ToList();
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetPackagings", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return packagingList;
        }

        public List<UnitOfMeasure> GetUOMs()
        {
            List<UnitOfMeasure> uomList = new List<UnitOfMeasure>();
            try
            {

               uomList = (from u in mockDB.UnitOfMeasures where u.IsVoided != true select u).OrderBy(x => x.BaseCode).ThenBy(y => y.Factor).ToList();
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetUOMs", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return uomList;
        }
        public List<Strength> GetStrengths()
        {
            List<Strength> strengthList = new List<Strength>();
            try
            {
                strengthList = (from s in mockDB.Strengths where s.IsVoided != true select s).OrderBy(x => x.StrengthDescription).ToList();
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetStrenghs", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return strengthList;
        }

        public List<Gender> GetGenders()
        {
            List<Gender> genderList = new List<Gender>();
            try
            {
                  genderList = (from g in mockDB.Genders where g.IsVoided != true select g).ToList();
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetGenders", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return genderList;
        }

        public List<Other> GetOthers()
        {
            List<Other> otherList = new List<Other>();
            try
            {
               otherList = (from f in mockDB.Other where f.IsVoided != true select f).OrderBy(x => x.OtherDescription).ToList();
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetOthers", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return otherList;
        }
        public List<UnitOfMeasureCategoryDTO> GetUOMCategories()
        {
            List<UnitOfMeasureCategoryDTO> uomList = new List<UnitOfMeasureCategoryDTO>();
            try
            {
              
                var uomdbList = (from u in mockDB.UnitOfMeasureCategories where u.IsVoided != true select u).ToList();
                foreach (var uom in uomdbList)
                {
                    UnitOfMeasureCategoryDTO udt = new UnitOfMeasureCategoryDTO();
                    udt.UOMCategoryId = uom.UOMCategoryId;
                    udt.UOMDescription = uom.UOMDescription;
                    udt.UOMCode = uom.UOMCode;
                    udt.UOMType = uom.UOMType;
                    uomList.Add(udt);

                }
            }
            catch (Exception ex)
            {
                error.LogSystemError("GetUOMCategories", ex.Message, WebSecurity.CurrentUserName, "Add");
            }

            return uomList.OrderBy(x => x.UOMDescription).ToList();
        }

        public List<UnitOfMeasureCategoryDTO> GetUOMBases()
        {
            List<UnitOfMeasureCategoryDTO> uomList = new List<UnitOfMeasureCategoryDTO>();
            try
            { var uomdbList = (from u in mockDB.UOMBases select u).ToList();
                foreach (var uom in uomdbList)
                {
                    UnitOfMeasureCategoryDTO udt = new UnitOfMeasureCategoryDTO();
                    udt.UOMCategoryId = uom.UOMBaseId;
                    udt.UOMDescription = uom.UOMBase1;
                    udt.UOMCode = uom.UOMBaseCode;
                    uomList.Add(udt);

                }

            }
            catch (Exception ex)
            {
                error.LogSystemError("GetUOMBases", ex.Message, WebSecurity.CurrentUserName, "Add");
            }

            return uomList.OrderBy(x => x.UOMDescription).ToList();
        }
        /// <summary>
        /// this functions generates the products ids. system uses the product id as the prefix and appends the variant codes to the end so product ids can be easily read.
        /// </summary>
        /// <param name="productList"></param>
        /// <returns></returns>
        public List<Product> GenerateProductIds(ProductDTO productList)
        {

            List<Product> productIdList = new List<Product>();
            try
            {


                Dictionary<string, string> variantCombos = new Dictionary<string, string>();

                variantCombos.Add(productList.ProductIdPrefix + "-", productList.BaseItemDescription + "; ");

                var colorList = (from c in mockDB.Colors where c.IsVoided != true select c).ToList();
                var sizeList = (from s in mockDB.Sizes where s.IsVoided != true select s).ToList();
                var orientationList = (from o in mockDB.Orientations where o.IsVoided != true select o).ToList();
                var flavorList = (from f in mockDB.Flavors where f.IsVoided != true select f).ToList();
                var packagingList = (from p in mockDB.Packagings where p.IsVoided != true select p).ToList();
                var uomList = (from u in mockDB.UnitOfMeasures where u.IsVoided != true select u).ToList();
                var strengthList = (from s in mockDB.Strengths where s.IsVoided != true select s).ToList();
                var genderList = (from g in mockDB.Genders where g.IsVoided != true select g).ToList();
                var otherList = (from f in mockDB.Other where f.IsVoided != true select f).ToList();
                Dictionary<string, string> uomDict = new Dictionary<string, string>();

                if (productList.ColorIdList.Any())
                {
                    Dictionary<string, string> tempVariantCombo = variantCombos.ToDictionary(a => a.Key, a => a.Value);
                    variantCombos.Clear();
                    foreach (var colorId in productList.ColorIdList)
                    {
                        var colorCode = colorList.Where(x => x.ColorId == colorId).Select(y => y.ColorCode).FirstOrDefault();
                        var colorDesc = colorList.Where(x => x.ColorId == colorId).Select(y => y.ColorDescription).FirstOrDefault();
                        foreach (var combo in tempVariantCombo.ToList())
                        {
                            variantCombos.Add(combo.Key + "1" + colorCode.ToUpper(), combo.Value + colorDesc + ", ");

                        }
                    }
                }

                if (productList.SizeIdList.Any())
                {
                    Dictionary<string, string> tempVariantCombo = variantCombos.ToDictionary(a => a.Key, a => a.Value);
                    variantCombos.Clear();
                    foreach (var sizeId in productList.SizeIdList)
                    {

                        var sizeCode = sizeList.Where(x => x.SizeId == sizeId).Select(y => y.SizeCode).FirstOrDefault();
                        var sizeDesc = sizeList.Where(x => x.SizeId == sizeId).Select(y => y.SizeDescription).FirstOrDefault();
                        foreach (var combo in tempVariantCombo.ToList())
                        {
                            variantCombos.Add(combo.Key + "2" + sizeCode.ToUpper(), combo.Value + sizeDesc + ", ");
                        }
                    }
                }

                if (productList.OrientationIdList.Any())
                {
                    Dictionary<string, string> tempVariantCombo = variantCombos.ToDictionary(a => a.Key, a => a.Value);
                    variantCombos.Clear();

                    foreach (var orientationId in productList.OrientationIdList)
                    {
                        var orientationCode = orientationList.Where(x => x.OrientationId == orientationId).Select(y => y.OrientationCode).FirstOrDefault();
                        var orientationDesc = orientationList.Where(x => x.OrientationId == orientationId).Select(y => y.OrientationDescription).FirstOrDefault();

                        foreach (var combo in tempVariantCombo.ToList())
                        {
                            variantCombos.Add(combo.Key + "3" + orientationCode.ToUpper(), combo.Value + orientationDesc + ", ");

                        }
                    }
                }

                if (productList.FlavorIdList.Any())
                {
                    Dictionary<string, string> tempVariantCombo = variantCombos.ToDictionary(a => a.Key, a => a.Value);
                    variantCombos.Clear();
                    foreach (var flavorId in productList.FlavorIdList)
                    {
                        var flavorCode = flavorList.Where(x => x.FlavorId == flavorId).Select(y => y.FlavorCode).FirstOrDefault();
                        var flavorDesc = flavorList.Where(x => x.FlavorId == flavorId).Select(y => y.FlavorDescription).FirstOrDefault();

                        foreach (var combo in tempVariantCombo.ToList())
                        {
                            variantCombos.Add(combo.Key + "4" + flavorCode.ToUpper(), combo.Value + flavorDesc + ", ");
                        }
                    }
                }

                if (productList.PackagingIdList.Any())
                {
                    Dictionary<string, string> tempVariantCombo = variantCombos.ToDictionary(a => a.Key, a => a.Value);
                    variantCombos.Clear();


                    foreach (var packagingId in productList.PackagingIdList)
                    {
                        var packagingCode = packagingList.Where(x => x.PackagingId == packagingId).Select(y => y.PackagingCode).FirstOrDefault();
                        var packagingDesc = packagingList.Where(x => x.PackagingId == packagingId).Select(y => y.PackagingDescription).FirstOrDefault();

                        foreach (var combo in tempVariantCombo.ToList())
                        {
                            variantCombos.Add(combo.Key + "5" + packagingCode.ToUpper(), combo.Value + packagingDesc + ", ");
                        }
                    }
                }

                if (productList.UOMIdList.Any())
                {
                    Dictionary<string, string> tempVariantCombo = variantCombos.ToDictionary(a => a.Key, a => a.Value);
                    variantCombos.Clear();
                    foreach (var uomId in productList.UOMIdList)
                    {
                        var uomCode = uomList.Where(x => x.UnitOfMeasureId == uomId).Select(y => y.UnitOfMeasureCode).FirstOrDefault();
                        var uomDesc = uomList.Where(x => x.UnitOfMeasureId == uomId).Select(y => y.UnitOfMeasureDescription).FirstOrDefault();

                   

                        foreach (var combo in tempVariantCombo.ToList())
                        {
                            variantCombos.Add(combo.Key + "6" + uomCode.ToUpper() + "::", combo.Value + uomDesc + ", ");
                        }
                    }

                }


                if (productList.StrengthIdList.Any())
                {
                    Dictionary<string, string> tempVariantCombo = variantCombos.ToDictionary(a => a.Key, a => a.Value);
                    variantCombos.Clear();

                    foreach (var strengthId in productList.StrengthIdList)
                    {
                        var strengthCode = strengthList.Where(x => x.StrengthId == strengthId).Select(y => y.StrengthCode).FirstOrDefault();
                        var strengthDesc = strengthList.Where(x => x.StrengthId == strengthId).Select(y => y.StrengthDescription).FirstOrDefault();

                        foreach (var combo in tempVariantCombo.ToList())
                        {
                            variantCombos.Add(combo.Key + "7" + strengthCode.ToUpper(), combo.Value + strengthDesc + ", ");
                        }
                    }
                }

                if (productList.GenderIdList.Any())
                {
                    Dictionary<string, string> tempVariantCombo = variantCombos.ToDictionary(a => a.Key, a => a.Value);
                    variantCombos.Clear();


                    foreach (var genderId in productList.GenderIdList)
                    {
                        var genderCode = genderList.Where(x => x.GenderId == genderId).Select(y => y.GenderCode).FirstOrDefault();
                        var genderDesc = genderList.Where(x => x.GenderId == genderId).Select(y => y.GenderDescription).FirstOrDefault();

                        foreach (var combo in tempVariantCombo.ToList())
                        {
                            variantCombos.Add(combo.Key + "8" + genderCode.ToUpper(), combo.Value + genderDesc + ", ");
                        }
                    }
                }

                if (productList.OtherIdList.Any())
                {
                    Dictionary<string, string> tempVariantCombo = variantCombos.ToDictionary(a => a.Key, a => a.Value);
                    variantCombos.Clear();
                    foreach (var otherId in productList.OtherIdList)
                    {
                        var otherCode = otherList.Where(x => x.OtherId == otherId).Select(y => y.OtherCode).FirstOrDefault();
                        var otherDesc = otherList.Where(x => x.OtherId == otherId).Select(y => y.OtherDescription).FirstOrDefault();

                        foreach (var combo in tempVariantCombo.ToList())
                        {
                            variantCombos.Add(combo.Key + "9" + otherCode.ToUpper(), combo.Value + otherDesc + ", ");
                        }
                    }
                }

                foreach (var productId in variantCombos)
                {
                    Product product = new Product();

                    if (productId.Key.EndsWith("-"))
                    {
                        product.ProductSku = productId.Key.Replace("-", "");

                    }
                    else
                    {
                        product.ProductSku = productId.Key;
                    }
                    product.ProductSku = product.ProductSku.ToUpper();

                    product.ProductIdPrefix = productList.ProductIdPrefix.ToUpper();
                    if (productId.Value.EndsWith(", "))
                    {
                        int index = productId.Value.LastIndexOf(',');
                        product.ProductDescription = productId.Value.Remove(index, 1);
                    }
                    else if (productId.Value.EndsWith("; "))
                    {
                        int index = productId.Value.LastIndexOf(';');
                        product.ProductDescription = productId.Value.Remove(index, 1);
                    }
                    else
                    {
                        product.ProductDescription = productId.Value;
                    }
                    product.ProductBaseDescription = productList.BaseItemDescription;

                    product.SupplierId = productList.SupplierId;
                    if (productList.BrandId == 0)
                    {
                        //new brand add it to the table
                        Brand brd = new Brand();
                        brd.BrandDescription = productList.BrandDescription;
                        brd.IsVoided = false;
                        mockDB.Brands.Add(brd);
                        mockDB.SaveChanges();
                        productList.BrandId = Convert.ToInt32(brd.BrandId);
                    }
                    product.BrandId = productList.BrandId;
                    product.Brand = productList.BrandDescription;
                    product.ClassId1 = productList.ClassId1;
                    product.ClassId2 = productList.ClassId2;
                    product.ClassId3 = productList.ClassId3;
                    product.TypeId = productList.TypeId;
                    product.VendorId = productList.VendorId;
                    product.VendorPartNo = productList.VendorPartNo;
                    if (productList.UOMIdList.Any())
                    {
             
                        var ind = product.ProductSku.IndexOf('6');
                        var ind2 = product.ProductSku.IndexOf("::");
                        var leng = product.ProductSku.Length;
                        var code = product.ProductSku.Substring(ind + 1, ind2-(ind+1));
                       product.ProductSku = product.ProductSku.Replace("::", "");
                        var uomId = uomList.Where(x => x.UnitOfMeasureCode == code).Select(y => y.UnitOfMeasureId).FirstOrDefault();
                        product.UnitOfMeasureId = uomId;
                    }
                    else
                    {
                        product.UnitOfMeasureId = 1;
                        var idx = product.ProductSku.IndexOf("-");

                        product.ProductSku = idx == -1 ? product.ProductSku + "-61EA" : product.ProductSku + "61EA";

                        product.ProductDescription = idx == -1 ? product.ProductDescription + "; 1/Each" : product.ProductDescription + ", 1/Each";
                    }
                    product.IsOneTimeProduct = productList.IsOneTime;

                    productIdList.Add(product);
                }

            }
            catch (Exception ex)
            {
                error.LogSystemError("GenerateProductIds", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return productIdList;
        }
        public void SaveNewSupplier(string supplierName)
        {
            try
            {
                Supplier supplier = new Supplier();
                supplier.SupplierDescription = supplierName;
                supplier.IsVoided = false;
                mockDB.Suppliers.Add(supplier);
                mockDB.SaveChanges();
            }
            catch (Exception ex)
            {
                error.LogSystemError("SaveNewSupplier", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
        }

      
        public string SaveNewColor(string colorName, string colorCode)
        {
            var existingColorCode = (from c in mockDB.Colors where c.ColorCode.Trim() == colorCode select c).FirstOrDefault();
            var hasCode = existingColorCode == null ? true : false;
            if (hasCode)
            {
                Color color = new Color();
                color.ColorDescription = colorName;
                color.ColorCode = colorCode.ToUpper();
                color.IsVoided = false;
                mockDB.Colors.Add(color);
                mockDB.SaveChanges();
                return "Success";
            }
            else
            {
                return "Code Exists";
            }
        }

        public string SaveNewSize(string sizeName, string sizeCode, int sizeTitleId)
        {
            var existingCode = (from s in mockDB.Sizes where s.SizeCode.Trim() == sizeCode select s).FirstOrDefault();
            var hasCode = existingCode == null ? true : false;
            if (hasCode)
            {
                Size size = new Size();
                size.SizeDescription = sizeName;
                size.SizeCode = sizeCode.ToUpper();
                size.SizeTitleId = sizeTitleId;
                size.IsVoided = false;
                mockDB.Sizes.Add(size);
                mockDB.SaveChanges();
                return "Success";
            }
            else
            {
                return "Code Exists";
            }
        }
        public string SaveNewOrientation(string orientationName, string orientationCode)
        {
            var existingCode = (from o in mockDB.Orientations where o.OrientationCode.Trim() == orientationCode select o).FirstOrDefault();
            var hasCode = existingCode == null ? true : false;
            if (hasCode)
            {
                Orientation orientation = new Orientation();
                orientation.OrientationDescription = orientationName;
                orientation.OrientationCode = orientationCode.ToUpper();
                orientation.IsVoided = false;
                mockDB.Orientations.Add(orientation);
                mockDB.SaveChanges();
                return "Success";
            }
            else
            {
                return "Code Exists";
            }

        }
        public string SaveNewFlavor(string flavorName, string flavorCode)
        {
            var existingCode = (from f in mockDB.Flavors where f.FlavorCode.Trim() == flavorCode select f).FirstOrDefault();
            var hasCode = existingCode == null ? true : false;
            if (hasCode)
            {
                Flavor flavor = new Flavor();
                flavor.FlavorDescription = flavorName;
                flavor.FlavorCode = flavorCode.ToUpper();
                flavor.IsVoided = false;
                mockDB.Flavors.Add(flavor);
                mockDB.SaveChanges(); return "Success";
            }
            else
            {
                return "Code Exists";
            }

        }
        public string SaveNewPackaging(string packagingName, string packagingCode)
        {
            var existingCode = (from p in mockDB.Packagings where p.PackagingCode.Trim() == packagingCode select p).FirstOrDefault();
            var hasCode = existingCode == null ? true : false;
            if (hasCode)
            {
                Packaging packaging = new Packaging();
                packaging.PackagingDescription = packagingName;
                packaging.PackagingCode = packagingCode.ToUpper();
                packaging.IsVoided = false;
                mockDB.Packagings.Add(packaging);
                mockDB.SaveChanges();
                return "Success";
            }
            else
            {
                return "Code Exists";
            }
        }
        public string SaveNewUOM(string newUOMFactor, string newUOMBase, string uomCode)
        {
            var existingCode = (from u in mockDB.UnitOfMeasures where u.UnitOfMeasureCode.Trim() == uomCode select u).FirstOrDefault();
            var hasCode = existingCode == null ? true : false;
            if (hasCode)
            {
                newUOMBase = newUOMBase.Trim();
                var baseCode = (from u in mockDB.UOMBases where u.UOMBase1 == newUOMBase select u.UOMBaseCode).FirstOrDefault();

                UnitOfMeasure uom = new UnitOfMeasure();
                uom.UnitOfMeasureDescription = newUOMFactor + "/" + newUOMBase.Trim();
                uom.BaseCode = baseCode;
                uom.Factor = newUOMFactor;
                uom.UnitOfMeasureCode = uomCode.ToUpper();
                uom.IsVoided = false;
                mockDB.UnitOfMeasures.Add(uom);
                mockDB.SaveChanges();
                return "Success";
            }
            else
            {
                return "Code Exists";
            }
        }
        public string SaveNewStrength(string strengthName, string strengthCode)
        {
            var existingCode = (from s in mockDB.Strengths where s.StrengthCode.Trim() == strengthCode select s).FirstOrDefault();
            var hasCode = existingCode == null ? true : false;
            if (hasCode)
            {
                Strength strength = new Strength();
                strength.StrengthDescription = strengthName;
                strength.StrengthCode = strengthCode.ToUpper();
                strength.IsVoided = false;
                mockDB.Strengths.Add(strength);
                mockDB.SaveChanges();
                return "Success";
            }
            else
            {
                return "Code Exists";
            }
        }

        public string SaveNewOther(string otherName, string otherCode)
        {
            var existingCode = (from f in mockDB.Other where f.OtherCode.Trim() == otherCode select f).FirstOrDefault();
            var hasCode = existingCode == null ? true : false;
            if (hasCode)
            {
                Other other = new Other();
                other.OtherDescription = otherName;
                other.OtherCode = otherCode.ToUpper();
                other.IsVoided = false;
                mockDB.Other.Add(other);
                mockDB.SaveChanges(); return "Success";
            }
            else
            {
                return "Code Exists";
            }

        }
        public string SaveProducts(List<Product> productList)
        {
            var result = "success";
            try
            {
                foreach (var product in productList)
                {

                    product.IsApproved = false;
                    product.IsVoided = false;
                    product.DateTimeCreated = DateTime.Now;
                     mockDB.Products.Add(product);
                    mockDB.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                result = "Error " + ex.Message;
                error.LogSystemError("SaveProducts", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return result;

        }
        public string SaveItemMapping(List<ProductMapping> mappingList)
        {
            var result = "success";
            try
            {
                mockDB.ProductMappings.AddRange(mappingList);
                mockDB.SaveChanges();
            }
            catch (Exception ex)
            {
                result = "Error " + ex.Message;
                error.LogSystemError("SaveItemMapping", ex.Message, WebSecurity.CurrentUserName, "Add");
            }
            return result;

        }
    }
}